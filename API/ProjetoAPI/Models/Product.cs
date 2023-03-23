using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoAPI.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required]
        [MinLength(1), MaxLength(100)]
        public string ProductName { get; set; }
        [Required]
        [MinLength(1), MaxLength(100)]
        public string ProductDescription { get; set; }
        [Required]
        public float ProductPrice { get; set; }


        public  int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Product_Category Product_Category { get; set; }

        public int BrandId { get; set; }
        [ForeignKey("BrandId")]
        public Brand Brand { get; set; }

    }


}
