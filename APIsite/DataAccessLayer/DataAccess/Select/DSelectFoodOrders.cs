using DataAccessLayer.Interface;
using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataAccess.Select
{
    public class DSelectFoodOrders : ISelectOrders
    {
        private RMS_Entities _db;

        public DSelectFoodOrders()
        {
            _db = new RMS_Entities();
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public IQueryable<setup_FoodOrder> SelectFoodOrderAll()
        {
            return _db.setup_FoodOrder;
        }
    }
}
