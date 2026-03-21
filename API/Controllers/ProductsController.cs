using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController(StoreContext context) : BaseApiController
    {
        // List Ambil semua product
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await context.products.ToListAsync();
        }

        // Proudct persatuan atau Per ID
        [HttpGet("{id}")] //product/2
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }
    }
}
