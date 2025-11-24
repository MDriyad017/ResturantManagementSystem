using CommonDataModel;
using DataAccessLayer.DataAccess.Delete;
using DataAccessLayer.DataAccess.Select;
using DataAccessLayer.Interface.Delete;
using DataAccessLayer.Interface.Select;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Delete
{
    public class DeleteFoodItem
    {
        public CommonMessage DeleteFood(long foodItemId)
        {
            try
            {
                ISelectFoodItem iSelectFoodItem = new DSelectFoodItem();

                var foodList = iSelectFoodItem.SelectFoodAll();

                if (foodList.Where(x => x.FoodItemID.Equals(foodItemId)).Count() == 0)
                {
                    return new CommonMessage()
                    {
                        IsSuccess = false,
                        Message = "Can not delete selected Item. Because Item is not foud..!!"
                    };
                }

                IDeleteFoodItem iDeleteFoodItem = new DDeleteFoodItem(foodItemId);

                if (iDeleteFoodItem.DeleteFoodItem())
                {
                    return new CommonMessage
                    {
                        IsSuccess = true,
                        Message = "Delete Successful.",
                        Message1 = foodItemId.ToString()
                    };
                }
                else
                {
                    return new CommonMessage
                    {
                        IsSuccess = false,
                        Message = "Delete Failed..!!"
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
