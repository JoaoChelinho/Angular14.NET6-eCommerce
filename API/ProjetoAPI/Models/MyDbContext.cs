using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;

namespace ProjetoAPI.Models
{
    public class MyDbContext : IdentityDbContext<IdentityUser>
    {
        public MyDbContext(DbContextOptions<MyDbContext>options)
        : base (options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }


        public virtual DbSet<Brand> Brand { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<Order_Item> Order_Item { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Product_Category> Product_Category { get; set; }

    }


}
