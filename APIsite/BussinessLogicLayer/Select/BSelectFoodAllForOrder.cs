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
    public class BSelectFoodAllForOrder
    {
        private object GetFoodListsForOrder(long categoryId)
        {
            try
            {
                ISelectFoodItem iSelectFoodItem = new DSelectFoodItem();

                var foodList = iSelectFoodItem.SelectFoodAll()
                    .WhereIf(categoryId > 0, x => x.CategoryID == categoryId)
                    .Select(s => new
                    {
                        s.FoodItemID,
                        s.FoodName,
                        s.FoodPrice,
                        s.Stock,
                        s.Available,
                        s.CategoryID,
                        FoodId = s.FoodItemID.ToString()
                    })
                    .OrderBy( o => new {o.FoodName})
                    .ToList();
                return foodList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object SelectAllFoodListForOrder(long categoryId)
        {
            try
            {
                return GetFoodListsForOrder(categoryId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
