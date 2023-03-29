using Microsoft.AspNetCore.Identity;

namespace ProjetoAPI.Identity
{
    public class AppUser : IdentityUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
    }

}
