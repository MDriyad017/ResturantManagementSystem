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
    public class DInsertFoodOrderDetails : IInsertFoodOrderDetails
    {
        private Resturant_ProjectEntities _db;
        private FoodOrderDetail _orderDetails;

        public DInsertFoodOrderDetails()
        {
            _db = new Resturant_ProjectEntities();
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool InsertFoodDetails(Guid orderId, List<CommonFoodDetails> eDetailsList)
        {
            try
            {
                int count = 0;

                foreach (var item in eDetailsList)
                {
                    ++count;

                    _db.FoodOrderDetails.Add(new FoodOrderDetail
                    {
                        OrderDetailsId = Guid.NewGuid(),
                        OrderID = orderId,
                        FoodId = item.FoodItemID,
                        Quantity = item.Quantity,
                        Price = item.FoodPrice
                    });

                    if (count % CommonValues.TotalNoOfRowsToSave == 0)
                    {
                        _db.SaveChanges();
                        _db.Dispose();
                        _db = new Resturant_ProjectEntities();
                        _db.Configuration.AutoDetectChangesEnabled = false;
                    }
                }

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
