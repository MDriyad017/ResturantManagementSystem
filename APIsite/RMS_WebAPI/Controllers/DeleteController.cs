using BussinessLogicLayer.Delete;
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
    public class DeleteController : ApiController
    {
        [HttpPost]
        [Route("D281224")]
        public IHttpActionResult DeleteFoodItem(long FoodItemId)
        {
            try
            {
                var data = new DeleteFoodItem()
                    .DeleteFood(FoodItemId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
