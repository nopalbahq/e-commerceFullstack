using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions<StoreContext> options) : DbContext(options)
{
  public required DbSet<Product> products { get; set; }
  public required DbSet<Cart> carts { get; set; }
}

