using CommonDataModel;
using DataAccessLayer.Interface.Update;
using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ServiceModel;

namespace DataAccessLayer.DataAccess.Update
{
    public class DUpdateFoodItem : IUpdateFoodItem
    {
        private RMS_Entities _db;
        private setup_FoodItem _findEntity;

        public DUpdateFoodItem(long foodItemId)
        {
            _db = new RMS_Entities();
            _db.Configuration.LazyLoadingEnabled = false;

            _findEntity = _db.setup_FoodItem.Find(foodItemId);
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool UpdateFoodItem(CommonFoodItem entity)
        {
            try
            {
                _findEntity.FoodName = entity.FoodName;
                _findEntity.FoodPrice = entity.FoodPrice;
                _findEntity.Stock = entity.Stock;
                _findEntity.Available = entity.Available;
                _findEntity.CategoryID = entity.CategoryID;

                _db.Entry(_findEntity).State = EntityState.Modified;
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool UpdateQuantityOnly(long quantity)
        {
            try
            {
                _findEntity.Stock -= quantity;
                if (_findEntity.Stock == 0)
                {
                    _findEntity.Available = false;
                }

                _db.Entry(_findEntity).State = EntityState.Modified;
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
