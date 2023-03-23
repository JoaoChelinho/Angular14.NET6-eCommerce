using System;
using System.ComponentModel.DataAnnotations;

namespace ProjetoAPI.Models.DTOs
{

    //public class ProductDTO
    //{
    //    public string ProductName { get; set; }
    //    public string ProductDescription { get; set; }
    //    public float ProductPrice { get; set; }

    //    public ProductDTO(Product product)
    //    {
    //        ProductName = product.ProductName;
    //        ProductDescription = product.ProductDescription;
    //        ProductPrice = product.ProductPrice;
    //    }
    //}
    public class CreateProductDTO
    {
        [Required]
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public float ProductPrice { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }

    }

    public class ListProductDTO
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public float ProductPrice { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }

    }

    public class UpdateProductDTO
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public float ProductPrice { get; set; }
        public int CategoryId { get; set; }
        public int BrandId { get; set; }


    }
}
