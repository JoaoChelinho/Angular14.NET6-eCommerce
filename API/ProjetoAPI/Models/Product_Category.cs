using System.ComponentModel.DataAnnotations;

namespace ProjetoAPI.Models
{
    public class Product_Category
    {
        [Key]   
        public int CategoryId { get; set; }
        [MinLength(1), MaxLength(100)]
        public string CategoryName { get; set; }

    }
}
