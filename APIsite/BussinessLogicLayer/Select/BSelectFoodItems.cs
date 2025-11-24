using CommonDataModel;
using DataAccessLayer.DataAccess.Select;
using DataAccessLayer.Interface.Select;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Select
{
    public class BSelectFoodItems
    {
        private object GetFoodItemLists(string query, int pageIndex, int pageSize)
        {
            try
            {
                pageSize = pageSize > 100 ? 100 : pageSize;
                int skip = pageSize * (pageIndex - 1);

                ISelectFoodItem iSelectFoodItem = new DSelectFoodItem();

                var foodList = iSelectFoodItem.SelectFoodAll()
                    .WhereIf(!string.IsNullOrEmpty(query), x => x.FoodName.Trim().ToLower().Contains(query.Trim().ToLower()))
                    .Select(s => new
                    {
                        s.FoodItemID,
                        s.FoodName,
                        s.FoodPrice,
                        s.Stock,
                        s.Available,
                        s.CategoryID,
                        FoodId = s.FoodItemID.ToString()
                    });
                    //.WhereIf(category == "MET", x => x.CategoryID == 1)
                    //.WhereIf(category == "FIS", x => x.CategoryID == 2)
                    //.WhereIf(category == "BAR", x => x.CategoryID == 3)
                    //.WhereIf(category == "DRK", x => x.CategoryID == 4)
                    //.WhereIf(category == "DRT", x => x.CategoryID == 5);

                var pageData = new CommonRecordInformation<dynamic>();
                pageData.TotalNumberOfRecords = foodList.Count();
                pageData.Start = CommonUtility.StartingIndexOfDataGrid((pageData.TotalNumberOfRecords == 0 ? 0 : pageIndex), pageSize);
                pageData.End = CommonUtility.EndingIndexOfDataGrid(pageData.Start, pageSize, pageData.TotalNumberOfRecords);
                pageData.LastPageNo = CommonUtility.LastPageNo(pageSize, pageData.TotalNumberOfRecords);
                //pageData.OthersData = iSelectFoodItem.SelectFoodAll()
                //    .Select(s => new
                //    {
                //        FoodId = s.FoodItemID.ToString()
                //    })
                //    .ToList();
                pageData.Data = foodList
                    .OrderBy(o => new { o.FoodName })
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

        public object SelectFoodItemsList(string query, int pageIndex, int pageSize)
        {
            try
            {
                return GetFoodItemLists(query, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
