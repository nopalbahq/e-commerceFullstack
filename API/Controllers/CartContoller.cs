using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class CartContoller(StoreContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<Cart>> GetCart()
        {
            var carts = await context.carts.Include(c => c.Items).ThenInclude(c => c.Product).FirstOrDefaultAsync(c => c.CartId == Request.Cookies["cartId"]);

            if (carts == null) return NoContent();

            return carts;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToCart(int productId, int qty)
        {
            // Get Cart
            var carts = await ReteiveCart();
            carts ??= CreateCart();

            var product = await context.products.FindAsync(productId);
            if (product == null) return BadRequest("Problem adding item to Cart");

            carts.AddItem(product, qty);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetCart), carts);

            return BadRequest("Problem updating cart");
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromCart(int productId, int qty)
        {
            return Ok();
        }

        private async Task<Cart?> ReteiveCart()
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
