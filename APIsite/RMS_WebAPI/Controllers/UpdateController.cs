using BussinessLogicLayer.Insert;
using BussinessLogicLayer.Update;
using CommonDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RMS_WebAPI.Controllers
{
	[RoutePrefix("api")]
	public class UpdateController : ApiController
    {
        [HttpPost]
        [Route("U301124")]
        public IHttpActionResult UpdateFoodCategories(CommonFoodCategory entityList)
        {
            try
            {
                var data = new BUpdateFoodCategory()
                    .UpdateFoodCategory(entityList);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("U281224")]
        public IHttpActionResult UpdateFoodItem(CommonFoodItem entityList)
        {
            try
            {
                var data = new BUpdateFoodItem()
                    .UpdateFoodItem(entityList);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("U260225")]
        public IHttpActionResult UpdateFoodOrderAndTbl(CommonFoodOrder entityList)
        {
            try
            {
                var data = new BUpdateFoodOrder()
                    .UpdateFoodOrder(entityList);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
