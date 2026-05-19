using System;

namespace API.DTO;

public class OrderItemDto
{
  public int ProductId { get; set; }
  public required string Name { get; set; }
  public required string PictureUrl { get; set; }
  public long Price { get; set; }
  public int Qty { get; set; }
}
