using System;
using API.Data;
using API.DTO;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController(StoreContext context) : BaseApiController
{
  [HttpGet]
  public async Task<ActionResult<List<OrderDto>>> GetOrders()
  {
    var orders = await context.Orders
    .ProjectToDto()
    .Where(x => x.BuyerEmail == User.GetUsername())
    .ToListAsync();

    return orders;
  }

  [HttpGet("{id:int}")]
  public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
  {
    var order = await context.Orders
    .ProjectToDto()
    .Where(x => x.BuyerEmail == User.GetUsername() && id == x.Id)
    .FirstOrDefaultAsync();

    if (order == null) return NotFound();

    return order;
  }

  [HttpPost]
  public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
  {
    var cart = await context.Cart.GetCartWithItems(Request.Cookies["cartId"]);

    if (cart == null || cart.Items.Count == 0 || string.IsNullOrEmpty(cart.PaymentIntentId))
      return BadRequest("Cart is empty or not found");

    var items = CreateOrderItems(cart.Items);
    if (items == null) return BadRequest("Some Item out of stock");

    var subtotal = items.Sum(x => x.Price * x.Qty);
    var deliveryFee = CalculateDeliveryFee(subtotal);

    var order = new Order
    {
      OrderItems = items,
      BuyerEmail = User.GetUsername(),
      ShippingAddress = orderDto.ShippingAddress,
      DeliverFee = deliveryFee,
      Subtotal = subtotal,
      PaymentSummary = orderDto.PaymentSummary,
      PaymentIntentId = cart.PaymentIntentId

    };

    context.Orders.Add(order);

    context.Cart.Remove(cart);
    Response.Cookies.Delete("cartId");

    var result = await context.SaveChangesAsync() > 0;

    if (!result) return BadRequest("Problem creating order");

    return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.ToDto());
  }

  private long CalculateDeliveryFee(long subtotal)
  {
    return subtotal > 1000 ? 0 : 500;
  }

  private List<OrderItem>? CreateOrderItems(List<CartItem> items)
  {
    var orderItems = new List<OrderItem>();

    foreach (var item in items)
    {
      if (item.Product.QuantityInStock < item.Qty)
      {
        return null;
      }


      var orderItem = new OrderItem
      {
        ItemOrdered = new ProductItemOrdered
        {
          ProductId = item.ProductId,
          PictureUrl = item.Product.PictureUrl,
          Name = item.Product.Name
        },
        Price = item.Product.Price,
        Qty = item.Qty
      };
      orderItems.Add(orderItem);

      item.Product.QuantityInStock -= item.Qty;

    }
    return orderItems;
  }
}
