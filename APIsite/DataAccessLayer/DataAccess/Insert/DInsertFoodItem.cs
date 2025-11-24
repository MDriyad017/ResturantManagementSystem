using CommonDataModel;
using DataAccessLayer.Interface.Insert;
using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataAccess.Insert
{
    public class DInsertFoodItem : IInsertFoodItem
    {
        private Resturant_ProjectEntities _db;
        private setup_FoodItem _entity;

        public DInsertFoodItem(CommonFoodItem entity) 
        {
            _db = new Resturant_ProjectEntities();
            _entity = new setup_FoodItem()
            {
                FoodItemID = entity.FoodItemID,
                FoodName = entity.FoodName,
                FoodPrice = entity.FoodPrice,
                Stock = entity.Stock,
                Available = entity.Available,
                CategoryID = entity.CategoryID,
            };
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool InsertFoodItem()
        {
            try
            {
                _db.setup_FoodItem.Add(_entity);
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
