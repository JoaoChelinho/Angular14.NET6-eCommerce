using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoAPI.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public float OrderTotal { get; set; }
        [Required]
        [MinLength(1), MaxLength(50)]
        public string OrderStatus { get; set; }

    }
}
