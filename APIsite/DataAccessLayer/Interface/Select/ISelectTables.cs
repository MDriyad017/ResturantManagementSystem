using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface.Select
{
    public interface ISelectTables
    {
        IQueryable<TableNo> SelectAllTable();
    }
}
