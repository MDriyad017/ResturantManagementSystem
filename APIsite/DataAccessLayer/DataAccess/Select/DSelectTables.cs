using DataAccessLayer.Interface.Select;
using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataAccess.Select
{
    public class DSelectTables : ISelectTables
    {
        private RMS_Entities _db;

        public DSelectTables()
        {
            _db = new RMS_Entities();
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public IQueryable<TableNo> SelectAllTable()
        {
            return _db.TableNoes;
        }
    }
}
