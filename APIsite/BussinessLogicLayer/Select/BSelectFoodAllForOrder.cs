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
        private object GetFoodListsForOrder(string category)
        {
            try
            {
                ISelectFoodItem iSelectFoodItem = new DSelectFoodItem();

                var foodList = iSelectFoodItem.SelectFoodAll()
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
                    .WhereIf(category == "MET", x => x.CategoryID == 1)
                    .WhereIf(category == "FIS", x => x.CategoryID == 2)
                    .WhereIf(category == "BAR", x => x.CategoryID == 3)
                    .WhereIf(category == "DRK", x => x.CategoryID == 4)
                    .WhereIf(category == "DRT", x => x.CategoryID == 5)
                    .OrderBy( o => new {o.FoodName})
                    .ToList();
                return foodList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object SelectAllFoodListForOrder(string category)
        {
            try
            {
                return GetFoodListsForOrder(category);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
