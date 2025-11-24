using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface
{
    public interface ISelectOrders
    {
        IQueryable<setup_FoodOrder> SelectFoodOrderAll();
    }
}
