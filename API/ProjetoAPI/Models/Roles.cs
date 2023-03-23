using System.ComponentModel.DataAnnotations;

namespace ProjetoAPI.Models
{
    public class Roles
    {
        [Key]
        public int RoleId { get; set; }
        [Required]
        [MinLength(1), MaxLength(100)]
        public string RoleName { get; set; }
    }
}
