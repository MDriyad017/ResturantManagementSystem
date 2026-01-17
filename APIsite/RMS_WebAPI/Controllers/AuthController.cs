using CommonDataModel;
using DBModel;
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
        private readonly Resturant_ProjectEntities _context = new Resturant_ProjectEntities();

        [HttpPost]
        [Route("register")]
        public IHttpActionResult Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (_context.Users.Any(u => u.UserName == model.UserName))
                return BadRequest("Username already exists");

            var userRole = _context.Roles.FirstOrDefault(r => r.RoleName == "User");
            if (userRole == null)
                return BadRequest("User role not found");

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            var user = new DBModel.User
            {
                FullName = model.FullName,
                UserName = model.UserName,
                PasswordHash = passwordHash,
                RoleId = userRole.RoleId,
                IsActive = true
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully");
        }

        [HttpPost]
        [Route("login001")]
        public IHttpActionResult Login(LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = (from u in _context.Users
                        join r in _context.Roles on u.RoleId equals r.RoleId
                        where u.UserName == model.UserName && u.IsActive == true
                        select new
                        {
                            u.UserName,
                            u.PasswordHash,
                            RoleName = r.RoleName
                        }).FirstOrDefault();

            if (user == null)
                return Unauthorized();

            // Verify password
            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                return Unauthorized();

            // Generate JWT
            var token = JwtManager.GenerateToken(user.UserName, user.RoleName);

            return Ok(new
            {
                token = token,
                role = user.RoleName
            });
        }
    }
}
