using CommonDataModel;
using DataAccessLayer;
using DataAccessLayer.DataAccess.Insert;
using DataAccessLayer.Interface.Insert;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Insert
{
    public class BInsertFoodCategory
    {
        public CommonMessage InsertFoodCategory(CommonFoodCategory entity)
        {
            try
            {
                ISelectFoodCategory iSelectFoodCategory = new DSelectFoodCategory();

                var foodCategoryList = iSelectFoodCategory.SelectFoodCategoryAll();

                if (foodCategoryList.Where(x => x.CategoryName.Trim().ToLower() == entity.CategoryName.Trim().ToLower()).Count() > 0)
                {
                    return new CommonMessage()
                    {
                        IsSuccess = false,
                        Message = "Duplicate Name..!!"
                    };
                }

                long newCategoryID = FindNewIndexOfTable.FindNewIndexForTable(iSelectFoodCategory.SelectFoodCategoryAll().OrderBy(o => o.CategoryID).Select(s => s.CategoryID).ToList());
                entity.CategoryID = newCategoryID;

                IInsertFoodCategory iInsertFoodCategory = new DInsertFoodCategory(entity);

                if (iInsertFoodCategory.InsertFoodCategory())
                {
                    return new CommonMessage
                    {
                        IsSuccess = true,
                        Message = "Insert Successfull."
                    };
                }
                else
                {
                    return new CommonMessage
                    {
                        IsSuccess = true,
                        Message = "Insert Failed..!!"
                    };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
