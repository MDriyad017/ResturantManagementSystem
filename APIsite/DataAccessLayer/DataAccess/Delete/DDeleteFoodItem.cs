using DataAccessLayer.Interface.Delete;
using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataAccess.Delete
{
    public class DDeleteFoodItem : IDeleteFoodItem
    {
        private Resturant_ProjectEntities _db;
        private setup_FoodItem _findEntity;

        public DDeleteFoodItem(long foodItemId)
        {
            _db = new Resturant_ProjectEntities();
            _findEntity = _db.setup_FoodItem.Find(foodItemId);
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool DeleteFoodItem()
        {
            try
            {
                _db.setup_FoodItem.Remove(_findEntity);
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
