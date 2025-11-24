using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CommonDataModel
{
    public class CommonFoodItem
    {
        public long FoodItemID { get; set; }
        public string FoodName { get; set; }
        public decimal FoodPrice { get; set; }
        public long Stock { get; set; }
        public bool Available { get; set; }
        public long CategoryID { get; set; }
    }
}
