using System.ComponentModel.DataAnnotations;

namespace ProjetoAPI.Models
{
    public class Brand
    {
        [Key]
        public int BrandId { get; set; }
        public string BrandName { get; set; }
    }
}
