using DataAccessLayer.Interface.Select;
using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataAccess.Select
{
    public class DSelectFoodItem : ISelectFoodItem
    {
        private Resturant_ProjectEntities _db;

        public DSelectFoodItem()
        {
            _db = new Resturant_ProjectEntities();
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public IQueryable<setup_FoodItem> SelectFoodAll()
        {
            return _db.setup_FoodItem;
        }
    }
}
