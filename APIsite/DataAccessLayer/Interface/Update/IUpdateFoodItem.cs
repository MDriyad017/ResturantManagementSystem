using CommonDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface.Update
{
    public interface IUpdateFoodItem
    {
        bool UpdateFoodItem(CommonFoodItem entity);
        bool UpdateQuantityOnly(long quantity);
    }
}
