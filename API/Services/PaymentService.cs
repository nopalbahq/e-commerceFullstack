using System;
using API.Entities;
using Stripe;

namespace API.Services;

public class PaymentService(IConfiguration config)
{
  public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Cart cart)
  {
    StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

    var service = new PaymentIntentService();

    var intent = new PaymentIntent();
    var subtotal = cart.Items.Sum(x => x.Qty * x.Product.Price);
    var deliveryFee = subtotal > 1000 ? 0 : 500;

    if (string.IsNullOrEmpty(cart.PaymentIntentId))
    {
      var options = new PaymentIntentCreateOptions
      {
        Amount = subtotal + deliveryFee,
        Currency = "USD",
        PaymentMethodTypes = ["card"]
      };
      intent = await service.CreateAsync(options);
    }
    else
    {
      var options = new PaymentIntentUpdateOptions
      {
        Amount = subtotal + deliveryFee
      };

      await service.UpdateAsync(cart.PaymentIntentId, options);
    }

    return intent;
  }
}
