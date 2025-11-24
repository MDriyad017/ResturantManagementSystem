using DataAccessLayer.DataAccess.Select;
using DataAccessLayer.Interface.Select;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Select
{
    public class BSelectTable
    {
        public object GetTableAll()
        {
            try
            {
                ISelectTables iSelectTables = new DSelectTables();

                var tableList = iSelectTables.SelectAllTable()
                    .Select(s => new
                    {
                        s.TableId,
                        s.Table,
                        s.IsAvailableTbl
                    })
                    .ToList();
                return tableList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
