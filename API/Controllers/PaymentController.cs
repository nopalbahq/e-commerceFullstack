using API.Data;
using API.DTO;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class PaymentsController(PaymentService paymentService, StoreContext context) : BaseApiController
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
    }
}
