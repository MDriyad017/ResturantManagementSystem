using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface.Update
{
    public interface IUpdateFoodOrder
    {
        bool UpdateIsPayementDoneOnly(bool isPaymentDone);
    }
}
