using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoAPI.Models;
using ProjetoAPI.Models.DTOs;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjetoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ProductController(MyDbContext context)
        {
            _context = context;
        }


        // GET all products


        [HttpGet("AllProducts")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll(int? categoryId, int? brandId, string? sort)
        {
            var productsQuery = _context.Product
                .Include(c => c.Product_Category)
                .Include(b => b.Brand)
                .Where(p => !categoryId.HasValue || p.Product_Category.CategoryId == categoryId.Value)
                .Where(p => !brandId.HasValue || p.Brand.BrandId == brandId.Value);

            switch (sort)
            {
                case "name":
                    productsQuery = productsQuery.OrderBy(p => p.ProductName);
                    break;
                case "priceAsc":
                    productsQuery = productsQuery.OrderBy(p => p.ProductPrice);
                    break;
                case "priceDes":
                    productsQuery = productsQuery.OrderByDescending(p => p.ProductPrice);
                    break;
                default:
                    break;
            }

            var products = await productsQuery.ToListAsync();

            return Ok(products);
        }



        [HttpGet("GetAllbyIDCrescente")]

        //public IActionResult GetAll()
        //{
        //    var products = _context.Product
        //        .Include(c => c.Product_Category)
        //        .Include(b => b.Brand)
        //        .ToList();

        //    var dtos = products.Select(p => new ListProductDTO
        //    {
        //        ProductName = p.ProductName,
        //        ProductDescription = p.ProductDescription,
        //        ProductPrice = p.ProductPrice,
        //        CategoryId = p.CategoryId,
        //        BrandId = p.BrandId
        //    }).ToList();

        //    return Ok(dtos);
        //}

        public async Task<IActionResult> GetAllProduct()
        {
            var products = await _context.Product
                .Include(c => c.Product_Category)
                .Include(b => b.Brand)
                .ToListAsync();

            var dtos = products.Select(p => new ListProductDTO
            {
                ProductName = p.ProductName,
                ProductDescription = p.ProductDescription,
                ProductPrice = p.ProductPrice,
                CategoryId = p.CategoryId,
                BrandId = p.BrandId
            }).ToList();

            return Ok(dtos);
        }


        [HttpGet("GetAllbyIDDecrescente")]

        public async Task<IActionResult> GetAllProductOrdered()
        {
            var products = await _context.Product
                .Include(c => c.Product_Category)
                .Include(b => b.Brand)
                .OrderByDescending(p => p.ProductId)
                .ToListAsync();

            var dtos = products.Select(p => new ListProductDTO
            {
                ProductName = p.ProductName,
                ProductDescription = p.ProductDescription,
                ProductPrice = p.ProductPrice,
                CategoryId = p.CategoryId,
                BrandId = p.BrandId
            }).ToList();

            return Ok(dtos);
        }



        // GET products by id

        [HttpGet("GetbyID")]

        //public async Task<ActionResult<Product>> GetItem(int id)
        //{
        //    var item = await _context.Product
        //        .SingleOrDefaultAsync(item => item.ProductId == id);

        //    if (item == null)
        //        return NotFound();

        //    return Ok(item);
        //}

        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Product
                .Include(c => c.Product_Category)
                .Include(b => b.Brand)
                .FirstOrDefaultAsync(b => b.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            var dto = new ListProductDTO
            {
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                ProductPrice = product.ProductPrice,
                CategoryId = product.CategoryId,
                BrandId = product.BrandId
            };

            return Ok(dto);
        }


        [HttpGet("OrderbyPriceCrescente")]

        //public IActionResult GetByPrice()
        //{
        //    var products = _context.Product
        //        .Include(c => c.Product_Category)
        //        .Include(b => b.Brand)
        //        .OrderBy(p => p.ProductPrice)
        //        .ToList();

        //    var dtos = products.Select(p => new ListProductDTO
        //    {
        //        ProductName = p.ProductName,
        //        ProductDescription = p.ProductDescription,
        //        ProductPrice = p.ProductPrice,
        //        CategoryId = p.CategoryId,
        //        BrandId = p.BrandId
        //    }).ToList();

        //    return Ok(dtos);
        //}


        public async Task<IActionResult> GetProductByPrice()
        {
            var products = await _context.Product
                .Include(c => c.Product_Category)
                .Include(b => b.Brand)
                .OrderBy(p => p.ProductPrice)
                .ToListAsync();

            var list = products.Select(p => new ListProductDTO
            {
                ProductName = p.ProductName,
                ProductDescription = p.ProductDescription,
                ProductPrice = p.ProductPrice,
                CategoryId = p.CategoryId,
                BrandId = p.CategoryId
            }).ToList();

            return Ok(list);
        }



        [HttpGet("OrderByPriceDescendente")]

        //public IActionResult GetByPriceDesc()
        //{
        //    var products = _context.Product
        //        .Include(c => c.Product_Category)
        //        .Include(b => b.Brand)
        //        .OrderByDescending(p => p.ProductPrice)
        //        .ToList();

        //    var dtos = products.Select(p => new ListProductDTO
        //    {
        //        ProductName = p.ProductName,
        //        ProductDescription = p.ProductDescription,
        //        ProductPrice = p.ProductPrice,
        //        CategoryId = p.CategoryId,
        //        BrandId = p.BrandId
        //    }).ToList();

        //    return Ok(dtos);
        //}


        public async Task<IActionResult> GetProductByPriceDesc()
        {
            var products = await _context.Product
                .Include(c => c.Product_Category)
                .Include(b => b.Brand)
                .OrderByDescending(p => p.ProductPrice)
                .ToListAsync();

            var dtos = products.Select(p => new ListProductDTO
            {
                ProductName = p.ProductName,
                ProductDescription = p.ProductDescription,
                ProductPrice = p.ProductPrice,
                CategoryId = p.CategoryId,
                BrandId = p.BrandId
            }).ToList();

            return Ok(dtos);
        }


        [HttpGet("GetProductsbyBrandIDandOrderbyProductIDDecrescente")]
        public async Task<IActionResult> GetProductByBrand(int brandId)
        {
            var products = await _context.Product
                .Include(c => c.Product_Category)
                .Include(b => b.Brand)
                .Where(p => p.BrandId == brandId)
                .OrderByDescending(p => p.ProductId)
                .ToListAsync();

            var dtos = products.Select(p => new ListProductDTO
            {
                ProductName = p.ProductName,
                ProductDescription = p.ProductDescription,
                ProductPrice = p.ProductPrice,
                CategoryId = p.CategoryId,
                BrandId = p.BrandId
            }).ToList();

            return Ok(dtos);
        }



        [HttpGet("GetProductsbyCategoryIDandOrderbyProductIDDecrescente")]
        public async Task<IActionResult> GetProductByCategory(int id)
        {
            var products = await _context.Product
                .Include(c => c.Product_Category)
                .Include(b => b.Brand)
                .Where(p => p.CategoryId == id)
                .OrderByDescending(p => p.ProductId)
                .ToListAsync();

            var dtos = products.Select(p => new ListProductDTO
            {
                ProductName = p.ProductName,
                ProductDescription = p.ProductDescription,
                ProductPrice = p.ProductPrice,
                CategoryId = p.CategoryId,
                BrandId = p.BrandId
            }).ToList();

            return Ok(dtos);
        }




        // POST 

        [HttpPost("Create")]
        public async Task<IActionResult> CreateProduct(CreateProductDTO product)
        {
            Product newProduct = new Product
            {
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                ProductPrice = product.ProductPrice,
                CategoryId = product.CategoryId,
                BrandId = product.BrandId
            };
            await _context.Product.AddAsync(newProduct);
            await _context.SaveChangesAsync();

            return Ok(newProduct);
        }




        // PUT  by id

        [HttpPut("UpdatebyID")]

        //public async Task<IActionResult> PutItem(int id, Product product)
        //{
        //    if (id != product.ProductId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(product).State = EntityState.Modified;
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}



        public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductDTO productUpdateDto)
        {
            var product = await _context.Product.FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            product.ProductName = productUpdateDto.ProductName;
            product.ProductDescription = productUpdateDto.ProductDescription;
            product.ProductPrice = productUpdateDto.ProductPrice;
            product.BrandId = productUpdateDto.BrandId;
            product.CategoryId = productUpdateDto.CategoryId;

            await _context.SaveChangesAsync();

            return NoContent();
        }



        // DELETE by id
        [HttpDelete("DeletebyID")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var item = await _context.Product.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            _context.Product.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
