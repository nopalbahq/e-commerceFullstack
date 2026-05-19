using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions<StoreContext> options) : IdentityDbContext<User>(options)
{
  public required DbSet<Product> Product { get; set; }
  public required DbSet<Cart> Cart { get; set; }
  public DbSet<Order> Orders { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    builder.Entity<IdentityRole>().HasData(
        new IdentityRole { Id = "de805d56-4acc-4c7b-b2e8-00a3c7168f8e", ConcurrencyStamp = "Member", Name = "Member", NormalizedName = "MEMBER" },
        new IdentityRole { Id = "b1306a83-1b44-4964-98b1-04ff7e80d52e", ConcurrencyStamp = "Admin", Name = "Admin", NormalizedName = "ADMIN" }
    );
  }
}

