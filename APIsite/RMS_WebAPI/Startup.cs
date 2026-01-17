using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Jwt;
using Owin;
using System;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RMS_WebAPI
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
            // Enable CORS for OWIN pipeline
            app.UseCors(CorsOptions.AllowAll);

            // 2️⃣ JWT Authentication Configuration
            var key = Encoding.ASCII.GetBytes("THIS_IS_A_VERY_SECRET_KEY");

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode.Active,
                TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }
            });

            // 3️⃣ Web API Configuration
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);

            app.UseWebApi(config);
        }
	}
}
