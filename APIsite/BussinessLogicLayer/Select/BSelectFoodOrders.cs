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

                ISelectFoodOrderDetails iSelectFoodOrderDetails = new DSelectFoodOrderDetails();

                // Retrieve the data from the database without concatenation
                var orderDetailLists = iSelectFoodOrderDetails.SelectAllOrderDetails()
                    .WhereIf(!string.IsNullOrEmpty(query), x => x.setup_FoodOrder.TableNo.Table.Trim().ToLower().Contains(query.Trim().ToLower()))
                    .Select(s => new
                    {
                        s.setup_FoodOrder.OrderId,
                        s.setup_FoodOrder.TableID,
                        s.setup_FoodOrder.TotalPrice,
                        s.setup_FoodOrder.IsPayementDone,
                        s.setup_FoodItem.FoodName,
                        s.setup_FoodOrder.TableNo.Table
                    })
                    .ToList(); // Execute the query and bring the data into memory

                // Group by order and concatenate food items in memory
                var groupedOrders = orderDetailLists
                    .GroupBy(x => new { x.OrderId, x.TableID, x.TotalPrice, x.Table, x.IsPayementDone })
                    .Select(g => new
                    {
                        g.Key.OrderId,
                        g.Key.TableID,
                        g.Key.TotalPrice,
                        Foods = string.Join(", ", g.Select(x => x.FoodName)),
                        g.Key.Table,
                        g.Key.IsPayementDone
                    })
                    .ToList();

                var pageData = new CommonRecordInformation<dynamic>();
                pageData.TotalNumberOfRecords = groupedOrders.Count();
                pageData.Start = CommonUtility.StartingIndexOfDataGrid((pageData.TotalNumberOfRecords == 0 ? 0 : pageIndex), pageSize);
                pageData.End = CommonUtility.EndingIndexOfDataGrid(pageData.Start, pageSize, pageData.TotalNumberOfRecords);
                pageData.LastPageNo = CommonUtility.LastPageNo(pageSize, pageData.TotalNumberOfRecords);

                pageData.Data = groupedOrders
                    .OrderBy(o => o.IsPayementDone)
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
    }
}
