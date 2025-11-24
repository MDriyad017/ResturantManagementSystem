using CommonDataModel;
using DataAccessLayer.DataAccess.Insert;
using DataAccessLayer.DataAccess.Select;
using DataAccessLayer.DataAccess.Update;
using DataAccessLayer.Interface;
using DataAccessLayer.Interface.Insert;
using DataAccessLayer.Interface.Update;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace BussinessLogicLayer.Insert
{
    public class BInsertOrder
    {
        private CommonMessage InsertOrderFinally(CommonFoodOrder entity)
        {
            try
            {
                entity.OrderId = Guid.NewGuid();
                IInsertFoodOrder iInsertFoodOrder = new DInsertFoodOrder(entity);
                iInsertFoodOrder.InsertFoodOrder();

                IUpdateTable iUpdateTable = new DUpdateTable(entity.TableID);
                bool isAvailableTble = false;
                iUpdateTable.UpdateIsAvailableTblOnly(isAvailableTble);

                IInsertFoodOrderDetails iInsertFoodOrderDetails = new DInsertFoodOrderDetails();
                iInsertFoodOrderDetails.InsertFoodDetails(entity.OrderId, entity.FoodDetailsList);

                foreach (var item in entity.FoodDetailsList)
                {
                    IUpdateFoodItem iUpdateFoodItem = new DUpdateFoodItem(item.FoodItemID);
                    iUpdateFoodItem.UpdateQuantityOnly(item.Quantity);
                }

                return new CommonMessage()
                {
                    IsSuccess = true,
                    Message = "Order Seccessfull"
                };

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public CommonMessage InsertOrder(CommonFoodOrder entity)
        {
            try
            {
                CommonMessage msg = new CommonMessage();

                using (TransactionScope transaction = new TransactionScope(TransactionScopeOption.Required, ApplicationState.TransactionOptions))
                {
                    msg = InsertOrderFinally(entity);

                    transaction.Complete();
                }

                return msg;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
