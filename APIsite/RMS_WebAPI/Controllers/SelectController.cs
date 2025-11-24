using BussinessLogicLayer;
using BussinessLogicLayer.Select;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RMS_WebAPI.Controllers
{
	[RoutePrefix("api")]
    public class SelectController : ApiController
    {
        [HttpGet]
        [Route("241124")]
        public IHttpActionResult SelectFoodCategoryList(string query, int pageIndex, int pageSize)
        {
            try
            {
                var data = new BSelectFoodCategory()
                             .SelectFoodCategoryLists(query, pageIndex, pageSize);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("G281224")]
        public IHttpActionResult SelectFoodItemLists(string query, int pageIndex, int pageSize)
        {
            try
            {
                var data = new BSelectFoodItems()
                    .SelectFoodItemsList(query, pageIndex, pageSize);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("G020125")]
        public IHttpActionResult SelectFoodItemLists(string category)
        {
            try
            {
                var data = new BSelectFoodAllForOrder()
                    .SelectAllFoodListForOrder(category);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        [HttpGet]
        [Route("G220225")]
        public IHttpActionResult SelectTableList()
        {
            try
            {
                var data = new BSelectTable()
                    .GetTableAll();
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("G250225")]
        public IHttpActionResult SelectOrderDetailsList(string query, int pageIndex, int pageSize)
        {
            try
            {
                var data = new BSelectFoodOrders()
                    .SelectOrdersForPayment(query, pageIndex, pageSize);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
