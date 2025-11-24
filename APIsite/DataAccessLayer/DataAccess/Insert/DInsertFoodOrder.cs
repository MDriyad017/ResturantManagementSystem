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
    public class DInsertFoodOrder : IInsertFoodOrder
    {
        private Resturant_ProjectEntities _db;
        private setup_FoodOrder _entity;

        public DInsertFoodOrder(CommonFoodOrder entity)
        {
            _db = new Resturant_ProjectEntities();
            _entity = new setup_FoodOrder
            {
                OrderId = entity.OrderId,
                TableID = entity.TableID,
                TotalPrice = entity.TotalFoodPrice,
                IsPayementDone = false
            };
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool InsertFoodOrder()
        {
            try
            {
                _db.setup_FoodOrder.Add(_entity);
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
