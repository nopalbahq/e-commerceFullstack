using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class CartsController(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            // Get Cart
            var carts = await RetreiveGetCart();

            if (carts == null) return NoContent();

            return carts.ToDo();
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToCart(int productId, int qty)
        {
            // Get Cart
            var carts = await RetreiveGetCart();
            carts ??= CreateCart();

            var product = await context.products.FindAsync(productId);
            if (product == null) return BadRequest("Problem with adding product");

            carts.AddItem(product, qty);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetCart), carts);


            return BadRequest("Problem Updating cart");
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveItemToCart()
        {
            return Ok();
        }


        private async Task<Cart?> RetreiveGetCart()
        {
            return await context.carts.Include(c => c.Items).ThenInclude(c => c.Product).FirstOrDefaultAsync(c => c.CartId == Request.Cookies["cartId"]);
        }

        private Cart CreateCart()
        {
            var cartId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };
            Response.Cookies.Append("cartId", cartId, cookieOptions);
            var cart = new Cart { CartId = cartId };
            context.carts.Add(cart);
            return cart;
        }

    }

}
