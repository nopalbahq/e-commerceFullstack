using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions<StoreContext> options) : DbContext(options)
{
  public required DbSet<Product> Product { get; set; }
  public required DbSet<Cart> Cart { get; set; }
}

