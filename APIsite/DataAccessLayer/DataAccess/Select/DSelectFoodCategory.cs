using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
	public class DSelectFoodCategory : ISelectFoodCategory
	{
		private RMS_Entities _db;

        public DSelectFoodCategory()
        {
            _db = new RMS_Entities();
        }

		[OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
		[TransactionFlow(TransactionFlowOption.Allowed)]
		public IQueryable<setup_FoodCategory> SelectFoodCategoryAll()
		{
			return _db.setup_FoodCategory;
		}
	}
}
