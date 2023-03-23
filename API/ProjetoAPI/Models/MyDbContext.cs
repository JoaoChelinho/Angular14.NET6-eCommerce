using Microsoft.EntityFrameworkCore;
using System;

namespace ProjetoAPI.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext>options)
        : base (options)
        {
        }

        public virtual DbSet<Brand> Brand { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<Order_Item> Order_Item { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Product_Category> Product_Category { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<User> User { get; set; }

    }


}
