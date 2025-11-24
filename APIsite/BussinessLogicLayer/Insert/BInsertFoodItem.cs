using CommonDataModel;
using DataAccessLayer.DataAccess.Insert;
using DataAccessLayer.DataAccess.Select;
using DataAccessLayer.Interface.Insert;
using DataAccessLayer.Interface.Select;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BussinessLogicLayer.Insert
{
    public class BInsertFoodItem
    {
        public CommonMessage InsertFood(CommonFoodItem entity)
        {
            try
            {
                ISelectFoodItem iSelectFoodItem = new DSelectFoodItem();
                var foodList = iSelectFoodItem.SelectFoodAll();

                // Check for duplicate food name
                if (foodList.Any(x => x.FoodName.Trim().ToLower() == entity.FoodName.Trim().ToLower()))
                {
                    return new CommonMessage()
                    {
                        IsSuccess = false,
                        Message = "Duplicate Food Name..!!"
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

                // Generate new FoodItemID
                long newFoodId = FindNewIndexOfTable.FindNewIndexForTable(
                    iSelectFoodItem.SelectFoodAll()
                        .OrderBy(o => o.FoodItemID)
                        .Select(s => s.FoodItemID)
                        .ToList()
                );
                entity.FoodItemID = newFoodId;

                // Insert into the database
                IInsertFoodItem iInsertFoodItem = new DInsertFoodItem(entity);
                if (iInsertFoodItem.InsertFoodItem())
                {
                    return new CommonMessage
                    {
                        IsSuccess = true,
                        Message = "Insert Successful.",
                        Message1 = entity.FoodItemID.ToString()
                    };
                }
                else
                {
                    return new CommonMessage
                    {
                        IsSuccess = false,
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
