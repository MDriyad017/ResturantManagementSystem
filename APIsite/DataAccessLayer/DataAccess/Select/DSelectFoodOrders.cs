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
        private Resturant_ProjectEntities _db;

        public DSelectFoodOrders()
        {
            _db = new Resturant_ProjectEntities();
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public IQueryable<setup_FoodOrder> SelectFoodOrderAll()
        {
            return _db.setup_FoodOrder;
        }
    }
}
