using CommonDataModel;
using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Select.Common
{
    public class BSelectCommonGetFoodCategoryLists
    {
        public List<CommonResultList> SelectAllCategoryList()
        {
            try
            {
                List<CommonResultList> initialList = new List<CommonResultList>();
                ISelectFoodCategory iSelectFoodCategory = new DSelectFoodCategory();

                initialList.Add(new CommonResultList { Item = "--- Select One ---", Value = "", IsSelected = true });

                List<CommonResultList> result = iSelectFoodCategory.SelectFoodCategoryAll()
                    .OrderBy(o => o.CategoryName)
                    .Select(s => new CommonResultList
                    {
                        Item = s.CategoryName.ToString(),
                        Value = s.CategoryID.ToString(),
                    })
                    .ToList();
                initialList.AddRange(result);
                return initialList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
