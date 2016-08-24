using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public enum PagingStyle
    {
        None = 0,

        Social,

        Bootstrap,

        More
    }
}
