using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJs_ClientView.Controllers
{
    public class FoodItemController : Controller
    {
        // GET: FoodItem
        public ActionResult Index()
        {
            return View();
        }
    }
}