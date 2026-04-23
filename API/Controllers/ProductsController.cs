using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    // Controller untuk handle semua request yang berhubungan dengan Product
    // BaseApiController berisi route dan konfigurasi dasar API
    public class ProductsController(StoreContext context) : BaseApiController
    {
        // Ambil semua product dengan filter, search, sort, dan pagination
        // Contoh request: GET /api/products?orderBy=price&searchTerm=boot&pageNumber=1&pageSize=10
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            // Bangun query bertahap, belum dieksekusi ke DB
            // Sort, Search, Filter masing-masing adalah extension method
            var query = context.Product
                .Sort(productParams.OrderBy)        // Urutkan by harga / nama / dll
                .Search(productParams.SearchTerm)   // Cari berdasarkan keyword
                .Filter(productParams.Brands, productParams.Types) // Filter by brand & type
                .AsQueryable();                     // Pastikan tetap IQueryable (belum hit DB)

            // Eksekusi query ke DB dengan pagination
            // Skip & Take terjadi di sini sesuai PageNumber & PageSize
            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            // Kirim info pagination (totalCount, totalPages, dll) ke Response Header
            // Agar Frontend bisa tau total data tanpa ikut di Body
            Response.AddPagingHeader(products.MetaData);

            // Kembalikan data product + metadata ke client
            // return Ok(new { Item = products, products.MetaData });
            return products;
        }

        // Ambil 1 product berdasarkan ID
        // Contoh request: GET /api/products/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            // Cari product by ID di DB
            var product = await context.Product.FindAsync(id);

            // Jika tidak ditemukan, kembalikan 404
            if (product == null) return NotFound();

            // Kembalikan data product yang ditemukan
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            // Filter select Brand
            var brand = await context.Product.Select(x => x.Brand).Distinct().ToListAsync();
            // Filter select Type
            var type = await context.Product.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brand, type });
        }
    }
}
