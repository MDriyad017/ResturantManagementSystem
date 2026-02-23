using CommonDataModel;
using DataAccessLayer.DataAccess.Select;
using DataAccessLayer.Interface;
using DataAccessLayer.Interface.Select;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Select
{
    public class BSelectFoodOrders
    {
        private object GetAllOrders(string query, int pageIndex, int pageSize)
        {
            try
            {
                pageSize = pageSize > 100 ? 100 : pageSize;
                int skip = pageSize * (pageIndex - 1);

                ISelectOrders selectOrders = new DSelectFoodOrders();
                var orderList = selectOrders.SelectFoodOrderAll()
                    .WhereIf(!string.IsNullOrEmpty(query), x => x.TableNo.Table.Trim().ToLower().Contains(query.Trim().ToLower()))
                    .Select(s => new
                    {
                        s.OrderId,
                        s.OrderDate,
                        s.TableID,
                        s.TableNo.Table,
                        s.TotalPrice,
                        s.IsPayementDone,
                        s.User.FullName,
                    })
                    .ToList();

                var pageData = new CommonRecordInformation<dynamic>();
                pageData.TotalNumberOfRecords = orderList.Count();
                pageData.Start = CommonUtility.StartingIndexOfDataGrid((pageData.TotalNumberOfRecords == 0 ? 0 : pageIndex), pageSize);
                pageData.End = CommonUtility.EndingIndexOfDataGrid(pageData.Start, pageSize, pageData.TotalNumberOfRecords);
                pageData.LastPageNo = CommonUtility.LastPageNo(pageSize, pageData.TotalNumberOfRecords);

                pageData.Data = orderList
                    .OrderBy(o => o.OrderDate)
                    .ThenBy(o => o.IsPayementDone)
                    .Skip(skip)
                    .Take(pageSize)
                    .ToList();

                return pageData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object SelectOrdersForPayment(string query, int pageIndex, int pageSize)
        {
            try
            {
                return GetAllOrders(query, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object SelectOrderDetailList(Guid orderId)
        {
            ISelectFoodOrderDetails iSelectFoodOrderDetails = new DSelectFoodOrderDetails();
            var orderDetailLists = iSelectFoodOrderDetails.SelectAllOrderDetails()
                .Where(x => x.OrderID == orderId)
                .Select(s => new
                {
                    s.OrderDetailsId,
                    s.setup_FoodItem.FoodName,
                    s.Quantity,
                    s.setup_FoodItem.FoodPrice,
                })
                .ToList();

            return orderDetailLists;
        }
    }
}
