using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvertoryAPI.Models
{
    public class InventoryDetailContext: DbContext
    {
        public InventoryDetailContext(DbContextOptions<InventoryDetailContext> options): base(options)
        {

        }

        public DbSet<InventoryDetail> InventoryDetails { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
    }
}
