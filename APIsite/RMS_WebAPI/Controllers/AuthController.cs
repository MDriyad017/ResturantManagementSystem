using CommonDataModel;
using DBModel;
using Newtonsoft.Json.Linq;
using RMS_WebAPI.JWT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;

namespace RMS_WebAPI.Controllers
{
    [RoutePrefix("api")]
    public class AuthController : ApiController
    {
        private readonly RMS_Entities _context = new RMS_Entities();

        [HttpPost]
        [Route("register001")]
        public IHttpActionResult Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                var error = ModelState.Values.SelectMany(v => v.Errors).FirstOrDefault()?.ErrorMessage;
                // Status code becomes 200 OK by default, body contains success: false
                return Ok(new { message = error ?? "Invalid data", success = false });
            }

            if (_context.Users.Any(u => u.UserName == model.UserName))
                return Ok(new { message = "Username already exists", success = false });

            var userRole = _context.Roles.FirstOrDefault(r => r.RoleName == "User");
            if (userRole == null)
                return Ok(new { message = "User role not found", success = false });

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var user = new DBModel.User
            {
                UserId = Guid.NewGuid(),
                FullName = model.FullName,
                UserName = model.UserName,
                PasswordHash = passwordHash,
                RoleId = userRole.RoleId,
                IsActive = true
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "User registered successfully", success = true });
        }

        [HttpPost]
        [Route("login001")]
        public IHttpActionResult Login(LoginModel model)
        {
            if (!ModelState.IsValid)
                return Ok(new { message = "Invalid input data", success = false });

            var user = (from u in _context.Users
                        join r in _context.Roles on u.RoleId equals r.RoleId
                        where u.UserName == model.UserName && u.IsActive == true
                        select new
                        {
                            u.UserId,
                            u.UserName,
                            u.PasswordHash,
                            RoleName = r.RoleName
                        }).FirstOrDefault();

            if (user == null)
                return Ok(new { message = "Invalid username or password", success = false });

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                return Ok(new { message = "Invalid username or password", success = false });

            var token = JwtManager.GenerateToken(user.UserName, user.RoleName, user.UserId);

            return Ok(new
            {
                token = token,
                role = user.RoleName,
                success = true,
                message = "Login successful"
            });
        }
    }
}
