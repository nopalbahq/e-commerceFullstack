using API.Data;
using API.DTO;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{

    public class PaymentsController(PaymentService paymentService, StoreContext context, IConfiguration config, ILogger<PaymentsController> logger) : BaseApiController
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<CartDto>> CreateOrUpdatePaymentIntent()
        {
            var cart = await context.Cart.GetCartWithItems(Request.Cookies["cartId"]);
            if (cart == null) return BadRequest("Problem in the Cart");

            var intent = await paymentService.CreateOrUpdatePaymentIntent(cart);
            if (intent == null) return BadRequest("Problem creating payment intent");

            cart.PaymentIntentId ??= intent.Id;
            cart.ClientSecret ??= intent.ClientSecret;

            // if there is 0 
            if (context.ChangeTracker.HasChanges())
            {
                var result = await context.SaveChangesAsync() > 0;

                if (!result) return BadRequest("Problem updating Cart with Intent");
            }

            return cart.ToDto();
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeHook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = ConstructStripeEvent(json);
                if (stripeEvent.Data.Object is not PaymentIntent intent)
                {
                    return BadRequest("Invalid event data");
                }

                if (intent.Status == "succeeded") await HandlePaymentIntentSucceeded(intent);
                else await HandlePaymentIntentFailed(intent);

                return Ok();
            }
            catch (StripeException ex)
            {
                logger.LogError(ex, "Stripe Webhook Error");
                return StatusCode(StatusCodes.Status500InternalServerError, "Webhook Error");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unexpected error has occured");
                return StatusCode(StatusCodes.Status500InternalServerError, "Unexpected Error");
            }
        }

        private async Task HandlePaymentIntentFailed(PaymentIntent intent)
        {
            var order = await context.Orders
                        .Include(x => x.OrderItems)
                        .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
                        ?? throw new Exception("Order not found");

            foreach (var items in order.OrderItems)
            {
                var productItem = await context.Product
                                    .FindAsync(items.ItemOrdered.ProductId)
                                    ?? throw new Exception("Problem updating order stock");

                productItem.QuantityInStock += items.Qty;
            }

            order.OrderStatus = OrderStatus.PaymentFailed;

            await context.SaveChangesAsync();
        }

        private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
        {
            var order = await context.Orders
                         .Include(x => x.OrderItems)
                         .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
                         ?? throw new Exception("Order not found");

            if (order.GetTotal() != intent.Amount)
            {
                order.OrderStatus = OrderStatus.PaymentMismatch;
            }
            else
            {
                order.OrderStatus = OrderStatus.PaymentReceived;

            }

            var cart = await context.Cart.FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id);

            if (cart != null) context.Cart.Remove(cart);

            await context.SaveChangesAsync();
        }

        private Event ConstructStripeEvent(string json)
        {
            try
            {
                return EventUtility.ConstructEvent(json,
                Request.Headers["Stripe-Signature"], config["StripeSettings:WhSecret"]);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to construct stripe event");
                throw new StripeException("Invalid Signature");
            }
        }
    }
}
