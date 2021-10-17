using InvertoryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace InvertoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly InventoryDetailContext _context;
        private readonly byte[] _secretKey;

        public AuthController(InventoryDetailContext context)
        {
            _context = context;
            _secretKey = Convert.FromBase64String("TW9zaGVFcmV6UHJpdmF0ZUtleQ==");
        }

        [HttpPost("Login")]
        public  ActionResult<object> Login(LoginModel model)
        {
            var user = _context.Users.Where(u => u.username == model.Username).FirstOrDefault();           
            if (user == null) { return NoContent(); }
            if (user.password != model.Password) { return NoContent(); }
            IAuthContainerModel authModel = GetJwtContainerModel(user);
            var token = GenerateToken(authModel);
            if (!IsTokenValid(token))
                throw new UnauthorizedAccessException();

            return new { Token = token };
        }

        private JWTContainerModel GetJwtContainerModel(Users user)
        {
            return new JWTContainerModel()
            {
                Claims = new[]
                {
                    new Claim(ClaimTypes.Name, user.username),
                    new Claim(ClaimTypes.Role, user.roleId.ToString())
                }
            };
        }

        private string GenerateToken(IAuthContainerModel model)
        {
            if (model == null || model.Claims == null || model.Claims.Length == 0)
                throw new ArgumentException("مقادیر وارده جهت ایجاد توکن معتبر نمی باشند.");
            SecurityTokenDescriptor securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(model.Claims),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(model.ExpireMinutes)),
                SigningCredentials = new SigningCredentials(GetSymmetrivSecurityKey(), model.SecurityAlgorithm)
            };
            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            string token = jwtSecurityTokenHandler.WriteToken(securityToken);
            return token;
        }

        private bool IsTokenValid(string token)
        {
            if (string.IsNullOrEmpty(token))
                throw new ArgumentException("توکن ورودی خالی یا بی مقدار است.");

            TokenValidationParameters tokenValidationParameters = GetTokenValidationParameters();
            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            try
            {
                ClaimsPrincipal tokenValid = jwtSecurityTokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken validatedToken);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private TokenValidationParameters GetTokenValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = GetSymmetrivSecurityKey()
            };
        }

        private SecurityKey GetSymmetrivSecurityKey()
        {
            return new SymmetricSecurityKey(_secretKey);
        }
    }
}
