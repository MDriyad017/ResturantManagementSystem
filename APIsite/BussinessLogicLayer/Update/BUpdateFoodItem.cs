using CommonDataModel;
using DataAccessLayer.DataAccess.Select;
using DataAccessLayer.DataAccess.Update;
using DataAccessLayer.Interface.Select;
using DataAccessLayer.Interface.Update;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Update
{
    public class BUpdateFoodItem
    {
        public CommonMessage UpdateFoodItem( CommonFoodItem entity)
        {
            try
            {
                ISelectFoodItem iSelectFoodItem = new DSelectFoodItem();

                var foodList = iSelectFoodItem.SelectFoodAll();

                if (foodList.Where(x => x.FoodItemID.Equals(entity.FoodItemID)).Count() == 0)
                {
                    return new CommonMessage()
                    {
                        IsSuccess = false,
                        Message = "Can not edit selected Item. Because Item is not foud..!!"
                    };
                }

                var selectedFoodList = foodList
                    .Where(x => x.FoodItemID != entity.FoodItemID);

                if (selectedFoodList.Where(x => x.FoodName.Trim().ToLower() == entity.FoodName.Trim().ToLower()).Count() > 0)
                {
                    return new CommonMessage()
                    {
                        IsSuccess = false,
                        Message = "Duplicate Name..!!"
                    };
                }

                if (entity.Stock > 0)
                {
                    entity.Available = true;
                }
                else
                {
                    entity.Available = false;
                }

                IUpdateFoodItem iUpdateFoodItem = new DUpdateFoodItem(entity.FoodItemID);

                if (iUpdateFoodItem.UpdateFoodItem(entity))
                {
                    return new CommonMessage
                    {
                        IsSuccess = true,
                        Message = "Update Successful.",
                        Message1 = entity.FoodItemID.ToString()
                    };
                }
                else
                {

                    return new CommonMessage
                    {
                        IsSuccess = false,
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
