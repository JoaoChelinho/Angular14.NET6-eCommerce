using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoAPI.Models;
using ProjetoAPI.Models.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjetoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly MyDbContext _context;

        public BrandController(MyDbContext context)
        {
            _context = context;
        }
        // GET

        [HttpGet("GetBrand")]
        public async Task<IActionResult> GetBrand()
        {
            var brands = await _context.Brand.ToListAsync();
            return Ok(brands);
        }



        [HttpGet ("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var brand = await _context.Brand
                .ToListAsync();

            var list = brand.Select(p => new BrandDTO
            {
                BrandName = p.BrandName
            }).ToList();

            return Ok(list);
        }


        [HttpGet("GetAllOrderedByName")]
        public async Task<IActionResult> GetAllBrandOrdered()
        {
            var brand = await _context.Brand
                .OrderBy(b => b.BrandName)
                .ToListAsync();

            var list = brand.Select(p => new BrandDTO
            {
                BrandName = p.BrandName
            }).ToList();

            return Ok(list);
        }



        // GET by ID
        [HttpGet("GetbyID")]
        public async Task<IActionResult> GetBrandById(int id)
        {
            var brand = await _context.Brand
                .FirstOrDefaultAsync(b => b.BrandId == id);

            if (brand == null)
            {
                return NotFound();
            }

            var list = new BrandDTO
            {
                BrandName = brand.BrandName,
            };

            return Ok(list);
        }

        // POST
        [HttpPost ("Create")]
        public async Task<IActionResult> CreateBrand(BrandDTO brand)
        {
            Brand newBrand = new Brand
            {
                BrandName = brand.BrandName,
            };
            await _context.Brand.AddAsync(newBrand);
            await _context.SaveChangesAsync();

            return Ok(newBrand);
        }

        // PUT
        [HttpPut ("UpdatebyID")]
        public async Task<IActionResult> UpdateBrand(int id, BrandDTO brandDto)
        {
            var brand = await _context.Brand.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }
            brand.BrandName = brandDto.BrandName;
            _context.Entry(brand).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE
        [HttpDelete("DeletebyID")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _context.Brand.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            _context.Brand.Remove(brand);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
