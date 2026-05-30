using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.RequestHelper;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    // Controller untuk handle semua request yang berhubungan dengan Product
    // BaseApiController berisi route dan konfigurasi dasar API
    public class ProductsController(StoreContext context, IMapper mapper, ImageService imageService) : BaseApiController
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
            var brands = await context.Product.Select(x => x.Brand).Distinct().ToListAsync();
            // Filter select Type
            var types = await context.Product.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(CreateProductDto productDTO)
        {
            var product = mapper.Map<Product>(productDTO);

            if (productDTO.File != null)
            {
                var imageResult = await imageService.AddImageAsync(productDTO.File);

                if (imageResult.Error != null)
                {
                    return BadRequest(imageResult.Error.Message);
                }

                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }

            context.Product.Add(product);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction(nameof(GetProduct), new { Id = product.Id }, product);

            return BadRequest("Problem creating new Product");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateProductDto(UpdateProductDto updateProductDto)
        {
            var product = await context.Product.FindAsync(updateProductDto.Id);
            if (product == null) return NotFound();

            mapper.Map(updateProductDto, product);

            if (updateProductDto.File != null)
            {
                var imageResult = await imageService.AddImageAsync(updateProductDto.File);

                if (imageResult.Error != null)
                {
                    return BadRequest(imageResult.Error.Message);
                }

                if (!string.IsNullOrEmpty(product.PublicId))
                {
                    await imageService.DeleteImageAsync(product.PublicId);
                }

                product.PictureUrl = imageResult.SecureUrl.AbsoluteUri;
                product.PublicId = imageResult.PublicId;
            }

            var result = await context.SaveChangesAsync() > 0;

            if (result) return NoContent();

            return BadRequest("Problem Updating Product");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProductDto(int id)
        {
            var product = await context.Product.FindAsync(id);

            if (product == null) return NoContent();

            if (!string.IsNullOrEmpty(product.PublicId))
            {
                await imageService.DeleteImageAsync(product.PublicId);
            }

            context.Product.Remove(product);

            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest("Problem Deleteing the product");
        }

    }
}
