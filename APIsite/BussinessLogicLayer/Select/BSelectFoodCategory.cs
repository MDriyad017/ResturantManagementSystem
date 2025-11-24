using CommonDataModel;
using DataAccessLayer;
using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public class BSelectFoodCategory
    {
        private object GetFoodCategories(string query, int pageIndex, int pageSize)
        {
            try
            {
                pageSize = pageSize > 100 ? 100 : pageSize;
                int skip = pageSize * (pageIndex - 1);

                ISelectFoodCategory iSelectFoodCategory = new DSelectFoodCategory();

                // Fetch data into a memory-compatible structure first
                var foodCategoryList = iSelectFoodCategory.SelectFoodCategoryAll()
                    .WhereIf(!string.IsNullOrEmpty(query), x => x.CategoryName.Trim().ToLower().Contains(query.Trim().ToLower()))
                    .Select(s => new
                    {
                        s.CategoryID,
                        s.CategoryName
                    });

                var pageData = new CommonRecordInformation<dynamic>();
                pageData.TotalNumberOfRecords = foodCategoryList.Count();
                pageData.Start = CommonUtility.StartingIndexOfDataGrid((pageData.TotalNumberOfRecords == 0 ? 0 : pageIndex), pageSize);
                pageData.End = CommonUtility.EndingIndexOfDataGrid(pageData.Start, pageSize, pageData.TotalNumberOfRecords);
                pageData.LastPageNo = CommonUtility.LastPageNo(pageSize, pageData.TotalNumberOfRecords);
                pageData.Data = foodCategoryList
                    .OrderBy(o => new { o.CategoryName })
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

        public object SelectFoodCategoryLists(string query, int pageIndex, int pageSize)
        {
            try
            {
                return GetFoodCategories(query, pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
