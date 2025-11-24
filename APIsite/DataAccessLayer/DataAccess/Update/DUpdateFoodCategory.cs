using CommonDataModel;
using DataAccessLayer.Interface.Update;
using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DataAccessLayer.DataAccess.Update
{
    public class DUpdateFoodCategory : IUpdateFoodCategory
    {
        private Resturant_ProjectEntities _db;
        private setup_FoodCategory _findEntity;

        public DUpdateFoodCategory(CommonFoodCategory entity)
        {
            _db = new Resturant_ProjectEntities();
            _db.Configuration.LazyLoadingEnabled = false;

            _findEntity = _db.setup_FoodCategory.Find(entity.CategoryID);
            _findEntity.CategoryName = entity.CategoryName;
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool UpdateFoodCategory()
        {
            try
            {
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
