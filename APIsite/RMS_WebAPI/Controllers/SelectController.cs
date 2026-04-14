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
        [Authorize(Roles = "Admin")]
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
        public IHttpActionResult SelectFoodItemLists(long categoryId)
        {
            try
            {
                var data = new BSelectFoodAllForOrder()
                    .SelectAllFoodListForOrder(categoryId);
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

        [Authorize(Roles = "Admin, Staf")]
        [HttpGet]
        [Route("G250225")]
        public IHttpActionResult SelectOrderList(string query, int pageIndex, int pageSize)
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

        [Authorize(Roles = "Admin, Staf")]
        [HttpGet]
        [Route("G220226")]
        public IHttpActionResult SelectOrderDetailsList(Guid orderId)
        {
            try
            {
                var data = new BSelectFoodOrders()
                    .SelectOrderDetailList(orderId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
