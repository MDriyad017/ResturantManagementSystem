using CommonDataModel;
using DataAccessLayer;
using DataAccessLayer.DataAccess.Update;
using DataAccessLayer.Interface.Update;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Update
{
    public class BUpdateFoodCategory
    {
        public CommonMessage UpdateFoodCategory(CommonFoodCategory entity)
        {
            try
            {
                ISelectFoodCategory iSelectFoodCategory = new DSelectFoodCategory();

                var foodCategoryList = iSelectFoodCategory.SelectFoodCategoryAll();

                if (foodCategoryList.Where(x => x.CategoryID.Equals(entity.CategoryID)).Count() == 0)
                {
                    return new CommonMessage()
                    {
                        IsSuccess = false,
                        Message = "Can not edit selected Item. Because Item is not foud..!!"
                    };
                }

                var selectedFoodCategoryList = foodCategoryList
                    .Where(x => x.CategoryID != entity.CategoryID);

                if (selectedFoodCategoryList.Where(x => x.CategoryName.Trim().ToLower() == entity.CategoryName.Trim().ToLower()).Count() > 0)
                {
                    return new CommonMessage()
                    {
                        IsSuccess = false,
                        Message = "Duplicate Name..!!"
                    };
                }

                IUpdateFoodCategory iUpdateFoodCategory = new DUpdateFoodCategory(entity);

                if (iUpdateFoodCategory.UpdateFoodCategory())
                {
                    return new CommonMessage()
                    {
                        IsSuccess = true,
                        Message = "Update Successfull."
                    };
                }
                else
                {
                    return new CommonMessage()
                    {
                        IsSuccess = true,
                        Message = "Update Failed..!!"
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
