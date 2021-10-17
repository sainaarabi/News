using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InvertoryAPI.Models
{
    public class Roles
    {
        [Key]
        public int RoleId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Title { get; set; }
    }
}
