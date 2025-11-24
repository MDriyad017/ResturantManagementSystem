using Microsoft.Owin.Cors;
using Microsoft.Owin;
using Owin;
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

			HttpConfiguration config = new HttpConfiguration();
			WebApiConfig.Register(config);

            app.UseWebApi(config);
		}
	}
}
