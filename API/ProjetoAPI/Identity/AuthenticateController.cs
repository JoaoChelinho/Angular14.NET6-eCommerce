using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProjetoAPI.Identity;
using ProjetoAPI.Identity.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JWTAuthentication.NET6._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticateController(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    role = userRoles.FirstOrDefault()
                });
            }
            return Unauthorized();
        }


        [HttpPost]
        [Authorize]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(-1),
                HttpOnly = true
            };
            Response.Cookies.Append("jwt", "", cookieOptions);

            return Ok(new Response { Status = "Success", Message = "User logged out successfully!" });
        }






        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            IdentityUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            await _userManager.AddToRoleAsync(user, UserRoles.User);

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }


        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var usersDto = new List<UserDTO>();

            foreach (var user in users)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var userDto = new UserDTO
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = userRoles.FirstOrDefault()
                };
                usersDto.Add(userDto);
            }

            return Ok(usersDto);
        }





        // PUT api/accounts/{id}/role
        [HttpPut("ChangeRole")]
        public async Task<IActionResult> ChangeUserRole(string id, [FromBody] string newRole)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            if (!await _roleManager.RoleExistsAsync(newRole))
            {
                return BadRequest($"The role '{newRole}' does not exist.");
            }

            var currentRole = (await _userManager.GetRolesAsync(user)).FirstOrDefault();

            if (currentRole == newRole)
            {
                return BadRequest("The user already has the selected role.");
            }

            var result = await _userManager.RemoveFromRoleAsync(user, currentRole);

            if (!result.Succeeded)
            {
                return BadRequest("Failed to remove current role from user.");
            }

            result = await _userManager.AddToRoleAsync(user, newRole);

            if (!result.Succeeded)
            {
                return BadRequest("Failed to add new role to user.");
            }

            return Ok();
        }



       
        [HttpDelete("DeleteById")]
     
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound(new Response { Status = "Error", Message = $"User with ID '{id}' not found!" });
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User deletion failed! Please try again." });
            }

            return Ok(new Response { Status = "Success", Message = $"User with ID '{id}' deleted successfully!" });
        }



        

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {

            if (_configuration == null)
            {
                throw new ArgumentNullException(nameof(_configuration));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]));


            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}