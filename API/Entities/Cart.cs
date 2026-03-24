using System;

namespace API.Entities;

public class Cart
{
  public int Id { get; set; }
  public required string CartId { get; set; }
  public List<CartItem> Items { get; set; } = new List<CartItem>();

  // Add Item in Cart
  public void AddItem(Product product, int Qty)
  {
    // Alert
    if (product == null) ArgumentNullException.ThrowIfNull(product);
    if (Qty <= 0) ArgumentException.ThrowIfNullOrEmpty("Quantity");

    var existItem = FindItem(product.Id);

    if (existItem == null)
    {
      Items.Add(new CartItem
      {
        Product = product,
        Qty = Qty
      });
    }
    else
    {
      existItem.Qty += Qty;
    }

  }

  // Cari barang
  public CartItem? FindItem(int productId)
  {
    return Items.FirstOrDefault(Items => Items.ProductId == productId);
  }

  // Remove Item
  public void RemoveItem(int productId, int qty)
  {
    if (qty <= 0) throw new ArgumentException("Quantity must more than 0");

    var items = FindItem(productId);
    if (items == null) return;

    items.Qty -= qty;
    if (items.Qty <= 0)
    {
      Items.Remove(items);
    }

  }


}
