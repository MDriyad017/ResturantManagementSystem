using BussinessLogicLayer.Insert;
using CommonDataModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace RMS_WebAPI.Controllers
{
	[RoutePrefix("api")]
	public class InsertController : ApiController
    {
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("IN281124")]
        public IHttpActionResult InsertFoodCategory(CommonFoodCategory entityList)
        {
            try
            {
                var data = new BInsertFoodCategory()
                .InsertFoodCategory(entityList);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("IN141024")]
        public IHttpActionResult InsertFoodItem(CommonFoodItem entityList)
        {
            try
            {
                // Pass the request to the business logic
                var result = new BInsertFoodItem()
                    .InsertFood(entityList);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("IN180225")]
        public IHttpActionResult InsertOrder(CommonFoodOrder entityList)
        {
            try
            {
                // Pass the request to the business logic
                var result = new BInsertOrder()
                    .InsertOrder(entityList);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
