using System;

namespace API.DTO;

public class UpdateProductDto : CreateProductDto
{
  public int Id { get; set; }
}
