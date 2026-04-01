using System;
using API.DTO;
using API.Entities;

namespace API.Extensions;

public static class CartExtensions
{
  public static CartDto ToDo(this Cart carts)
  {
    return new CartDto
    {
      CartId = carts.CartId,
      Items = carts.Items.Select(x => new CartItemDto
      {
        ProductId = x.ProductId,
        Name = x.Product.Name,
        Price = x.Product.Price,
        Brand = x.Product.Brand,
        Type = x.Product.Type,
        PictureUrl = x.Product.PictureUrl,
        Quantity = x.Product.QuantityInStock
      }).ToList()
    };
  }
}
