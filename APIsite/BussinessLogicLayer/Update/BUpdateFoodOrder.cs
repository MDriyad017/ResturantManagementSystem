using CommonDataModel;
using DataAccessLayer.DataAccess.Update;
using DataAccessLayer.Interface.Update;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace BussinessLogicLayer.Update
{
    public class BUpdateFoodOrder
    {
        private CommonMessage UpdateFoodOrderFinally(CommonFoodOrder entity)
        {
            try
            {
                IUpdateFoodOrder iUpdateFoodOrder = new DUpdateFoodOrder(entity.OrderId);
                bool isPaymentDone = true;
                iUpdateFoodOrder.UpdateIsPayementDoneOnly(isPaymentDone);

                IUpdateTable iUpdateTable = new DUpdateTable(entity.TableID);
                bool isTableAvailable = true;
                iUpdateTable.UpdateIsAvailableTblOnly(isTableAvailable);

                return new CommonMessage()
                {
                    IsSuccess = true,
                    Message = "Payment Done"
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public CommonMessage UpdateFoodOrder(CommonFoodOrder entity)
        {
            try
            {
                CommonMessage msg = new CommonMessage();

                using (TransactionScope transaction = new TransactionScope(TransactionScopeOption.Required, ApplicationState.TransactionOptions))
                {
                    msg = UpdateFoodOrderFinally(entity);

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
