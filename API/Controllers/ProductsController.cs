using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController(StoreContext context) : BaseApiController
    {
        // List Ambil semua product
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = context.Product
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

            var product = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
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
