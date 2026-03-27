using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("Carts")]
public class Cart
{
  public int Id { get; set; }
  public required string CartId { get; set; }
  public List<CartItem> Items { get; set; } = new List<CartItem>();

  public void AddItem(Product product, int qty)
  {
    // Check if product empty
    if (product == null) ArgumentNullException.ThrowIfNull(product);
    if (qty <= 0) ArgumentException.ThrowIfNullOrEmpty("Quantity must be greater than 0");

    // Check
    var existItem = FindItem(product.Id);

    if (existItem == null)
    {
      Items.Add(new CartItem
      {
        Product = product,
        Qty = qty
      });
    }
    else
    {
      existItem.Qty += qty;
    }

  }

  // Find Item
  public CartItem? FindItem(int productId)
  {
    return Items.FirstOrDefault(Items => Items.ProductId == productId);
  }

  public void RemoveItem(int productId, int qty)
  {
    if (qty <= 0) ArgumentException.ThrowIfNullOrEmpty("Quantity must more than 0");

    var items = FindItem(productId);

    // If items empty do nothing
    if (items == null) return;

    items.Qty -= qty;
    if (items.Qty <= 0)
    {
      Items.Remove(items);
    }

  }


}
