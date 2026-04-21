using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController(StoreContext context) : BaseApiController
    {
        // List Ambil semua product
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(string? orderBy, string? searchTerm)
        {
            var query = context.Product
            .Sort(orderBy)
            .Search(searchTerm)
            .AsQueryable();


            return await query.ToListAsync();
        }

        // Proudct persatuan atau Per ID
        [HttpGet("{id}")] //product/2
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Product.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }
    }
}
