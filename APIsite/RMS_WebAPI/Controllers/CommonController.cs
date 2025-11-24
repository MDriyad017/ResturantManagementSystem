using BussinessLogicLayer.Select.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RMS_WebAPI.Controllers
{
    [RoutePrefix("api")]
    public class CommonController : ApiController
    {
        [HttpGet]
        [Route("C091224")]
        public IHttpActionResult GetFoodCategoryForDropDown()
        {
            try
            {
                var data = new BSelectCommonGetFoodCategoryLists()
                    .SelectAllCategoryList();
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
