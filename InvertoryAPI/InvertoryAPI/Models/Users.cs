using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InvertoryAPI.Models
{
    public class Users
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string username { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string password { get; set; }

        public int roleId { get; set; }

    }
}
