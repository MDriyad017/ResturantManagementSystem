using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJs_ClientView.Controllers
{
    public class ImageUploadsController : Controller
    {
        // Post: ImageUploads
        [HttpPost]
        public ContentResult UploadFoodImages()
        {
            string path = Server.MapPath("~/Images/FoodImg/");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string fileName = Request.Form["foodId"].Replace("/", "") + ".jpg";

            foreach (string key in Request.Files)
            {
                HttpPostedFileBase postedFile = Request.Files[key];
                postedFile.SaveAs(path + fileName);
            }

            return Content("Success");
        }
        
        // Post: Image Delete
        [HttpPost]
        public ContentResult DeleteFoodImages()
        {
            string path = Server.MapPath("~/Images/FoodImg/");
            string fileName = Request.Form["foodId"].Replace("/", "") + ".jpg";
            string filePath = Path.Combine(path, fileName);

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            return Content("Success");
        }

    }
}

