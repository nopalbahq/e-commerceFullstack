using System;
using API.Entities;

namespace API.DTO;

public class CartDto
{
  public int Id { get; set; }
  public required string CartId { get; set; }
  public List<CartItemDto> Items { get; set; } = [];

}
