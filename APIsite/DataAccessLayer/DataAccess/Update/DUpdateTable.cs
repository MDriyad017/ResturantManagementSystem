using CommonDataModel;
using DataAccessLayer.Interface.Update;
using DBModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace DataAccessLayer.DataAccess.Update
{
    public class DUpdateTable : IUpdateTable
    {
        private RMS_Entities _db;
        private TableNo _findEntity;

        public DUpdateTable(int tableId)
        {
            _db = new RMS_Entities();
            _db.Configuration.LazyLoadingEnabled = false;

            _findEntity = _db.TableNoes.Find(tableId);
        }

        [OperationBehavior(TransactionScopeRequired = true, TransactionAutoComplete = true)]
        [TransactionFlow(TransactionFlowOption.Allowed)]
        public bool UpdateIsAvailableTblOnly(bool isAvailableTbl)
        {
            try
            {
                _findEntity.IsAvailableTbl = isAvailableTbl;

                _db.Entry(_findEntity).State = EntityState.Modified;
                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
