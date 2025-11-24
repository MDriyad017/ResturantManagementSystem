using CommonDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface.Insert
{
    public interface IInsertFoodOrderDetails
    {
        bool InsertFoodDetails(Guid orderId, List<CommonFoodDetails> eDetailsList);
    }
}
