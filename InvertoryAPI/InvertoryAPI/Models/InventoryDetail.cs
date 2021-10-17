using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InvertoryAPI.Models
{
    public class InventoryDetail
    {
        [Key]
        public int InventoryDetailId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string  Title { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(200)")]
        public string  Body { get; set; }

      
    }
}
