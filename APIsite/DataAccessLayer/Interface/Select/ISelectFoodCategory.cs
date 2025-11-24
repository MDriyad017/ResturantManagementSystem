using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
	public interface ISelectFoodCategory
	{
		IQueryable<setup_FoodCategory> SelectFoodCategoryAll();
	}
}
