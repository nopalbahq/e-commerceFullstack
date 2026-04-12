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
            // if carts = null retrun value no content
            if (carts == null) return NoContent();

            // return value toDo from CartDto = CartExtensions 
            return carts.ToDto();
        }


        [HttpPost]
        public async Task<ActionResult> AddItemToCart(int productId, int qty)
        {
            // Get Cart DbSet
            var carts = await RetreiveGetCart();

            // Create Cart
            // if carts Null do Create
            carts = carts ?? CreateCart();

            //  Get Product from DbSet
            var product = await context.Product.FindAsync(productId);

            // if product is empty return value BadRequest
            if (product == null)
            {
                return BadRequest("Problem with adding product");
            }

            // Cart Model addItem Product and qty
            carts.AddItem(product, qty);

            // Get StoreContext SaveChanges
            var result = await context.SaveChangesAsync() > 0;

            // 
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
            // Get Cart and Get Items (Cart) Include Product (CartItem) and get CartId in CartItem
            return await context.Cart.Include(c => c.Items).ThenInclude(c => c.Product).FirstOrDefaultAsync(c => c.CartId == Request.Cookies["cartId"]);
        }

        private Cart CreateCart()
        {
            // Create CartId
            var cartId = Guid.NewGuid().ToString();

            // Cookie Options by class
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };

            // Send Cookie to browser and bring Cookie with CartId
            Response.Cookies.Append("cartId", cartId, cookieOptions);


            var cart = new Cart
            {
                CartId = cartId
            };

            // Bring new Cart with cartId to class Cart (build with new cartId)
            context.Cart.Add(cart);
            return cart;
        }

    }

}
