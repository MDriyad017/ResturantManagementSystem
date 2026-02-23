using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonDataModel
{
    public class CommonFoodOrder
    {
        public Guid UserId { get; set; }
        public Guid OrderId { get; set; }
        public decimal TotalFoodPrice { get; set; }
        public int TableID { get; set; }
        public List<CommonFoodDetails> FoodDetailsList { get; set; }
    }

    public class CommonFoodDetails
    {
        public Guid OrderId { get; set; }
        public long FoodItemID { get; set; }
        public string FoodName { get; set; }
        public decimal FoodPrice { get; set; }
        public long Quantity { get; set; }
    }
}
