using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoAPI.Models;
using ProjetoAPI.Models.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjetoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Product_CategoryController : ControllerBase
    {
        private readonly MyDbContext _context;

        public Product_CategoryController(MyDbContext context)
        {
            _context = context;
        }

        // GET


        [HttpGet("GetCategory")]
        public async Task<IActionResult> GetCategory()
        {
            var categories = await _context.Product_Category.ToListAsync();
            return Ok(categories);
        }





        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllCategory()
        {
            var category = await _context.Product_Category
                .ToListAsync();

            var list = category.Select(p => new Product_CategoryDTO
            {
                CategoryName = p.CategoryName
            }).ToList();

            return Ok(list);
        }

        [HttpGet("GetAllOrderedByName")]
        public async Task<IActionResult> GetAllCategoryOrdered()
        {
            var category = await _context.Product_Category
                .OrderBy(c => c.CategoryName)
                .ToListAsync();

            var list = category.Select(p => new Product_CategoryDTO
            {
                CategoryName = p.CategoryName
            }).ToList();

            return Ok(list);
        }



        // GET by ID

        [HttpGet("GetByID")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _context.Product_Category
                .FirstOrDefaultAsync(b => b.CategoryId == id);

            if (category == null)
            {
                return NotFound();
            }

            var list = new Product_CategoryDTO
            {
                CategoryName = category.CategoryName,
            };

            return Ok(list);
        }




        // POST

        [HttpPost("Create")]
        public async Task<IActionResult> CreateCategory(Product_CategoryDTO category)
        {
            Product_Category newCategory = new Product_Category
            {
                CategoryName = category.CategoryName,
            };
            await _context.Product_Category.AddAsync(newCategory);
            await _context.SaveChangesAsync();

            return Ok(newCategory);
        }

        // PUT

        [HttpPut("UpdatebyID")]
        public async Task<IActionResult> UpdateCategory(int id, Product_CategoryDTO categoryDto)
        {
            var category = await _context.Product_Category.FindAsync(id);
            
            if (category == null)
            {
                return NotFound();
            }
            category.CategoryName = categoryDto.CategoryName;
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE

        [HttpDelete("DeletebyID")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Product_Category.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            _context.Product_Category.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
