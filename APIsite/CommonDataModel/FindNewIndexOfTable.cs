using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonDataModel
{
    public class FindNewIndexOfTable
    {
        public static long FindNewIndexForTable(List<long> existingIndexs)
        {
            long newIndex = 1;
            foreach (long index in existingIndexs)
            {
                if (!existingIndexs.Contains(newIndex))
                {
                    break;
                }

                ++newIndex;
            }

            return newIndex;
        }
    }
}
