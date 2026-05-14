using System;
using API.DTO;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class CartExtensions
{
  public static CartDto ToDto(this Cart Cart)
  {
    return new CartDto
    {
      CartId = Cart.CartId,
      ClientSecret = Cart.ClientSecret,
      PaymentIntentId = Cart.PaymentIntentId,
      Items = Cart.Items.Select(x => new CartItemDto
      {
        ProductId = x.ProductId,
        Name = x.Product.Name,
        Price = x.Product.Price,
        Brand = x.Product.Brand,
        Type = x.Product.Type,
        PictureUrl = x.Product.PictureUrl,
        Quantity = x.Qty
      }).ToList()
    };
  }

  public static async Task<Cart> GetCartWithItems(this IQueryable<Cart> query, string? cartId)
  {
    return await query
                .Include(c => c.Items)
                .ThenInclude(c => c.Product)
                .FirstOrDefaultAsync(c => c.CartId == cartId) ?? throw new Exception("Cannot Get Cart");
  }
}
