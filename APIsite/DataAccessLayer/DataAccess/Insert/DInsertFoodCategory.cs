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
    public class DInsertFoodCategory : IInsertFoodCategory
    {
        private RMS_Entities _db;
        private setup_FoodCategory _entity;

        public DInsertFoodCategory(CommonFoodCategory entity)
        {
            _db = new RMS_Entities();
            _entity = new setup_FoodCategory
            {
                CategoryID = entity.CategoryID,
                CategoryName = entity.CategoryName,
            };
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool InsertFoodCategory()
        {
            try
            {
                _db.setup_FoodCategory.Add(_entity);
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
