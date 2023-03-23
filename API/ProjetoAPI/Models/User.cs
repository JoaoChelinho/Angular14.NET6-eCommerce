using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [MinLength(1), MaxLength(50)]
        public string UserName { get; set; }
        [Required]
        [MinLength(5), MaxLength(500)]
        public string UserEmail { get; set; }
        [Required]
        [MinLength(8), MaxLength(10)]
        public int UserNIF { get; set; }
        [Required]
        [MinLength(1), MaxLength(200)]
        public string UserAdress { get; set; }

        public int RolesId { get; set; }
        [ForeignKey("RolesId")]
        public Roles Roles { get; set; }

    }
}
