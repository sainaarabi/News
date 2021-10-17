using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace InvertoryAPI.Models
{
    public interface IAuthContainerModel
    {
        string SecretKey { set; get; }
        string SecurityAlgorithm { set; get; }
        int ExpireMinutes { set; get; }
        Claim[] Claims { set; get; }
    }
}
