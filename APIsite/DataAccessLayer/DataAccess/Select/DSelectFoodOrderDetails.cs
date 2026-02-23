using DataAccessLayer.Interface.Select;
using DBModel;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataAccess.Select
{
    public class DSelectFoodOrderDetails : ISelectFoodOrderDetails
    {
        private RMS_Entities _db;

        public DSelectFoodOrderDetails()
        {
            _db = new RMS_Entities();
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public IQueryable<FoodOrderDetail> SelectAllOrderDetails()
        {
            return _db.FoodOrderDetails;
        }
    }
}
