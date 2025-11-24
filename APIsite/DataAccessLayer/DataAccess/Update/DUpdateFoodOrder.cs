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
    public class DUpdateFoodOrder : IUpdateFoodOrder
    {
        private Resturant_ProjectEntities _db;
        private setup_FoodOrder _findEntity;

        public DUpdateFoodOrder(Guid orderId)
        {
            _db = new Resturant_ProjectEntities();
            _db.Configuration.LazyLoadingEnabled = false;

            _findEntity = _db.setup_FoodOrder.Find(orderId);
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool UpdateIsPayementDoneOnly(bool isPaymentDone)
        {
            try
            {
                _findEntity.IsPayementDone = isPaymentDone;

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
