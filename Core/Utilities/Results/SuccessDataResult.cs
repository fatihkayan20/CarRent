using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Utilities.Results
{
    public class SuccessDataResult<T> : DataResult<T>
    {
        public SuccessDataResult( T data) : base(true, data)
        {
        }

        public SuccessDataResult( T data, string message) : base(true, data, message)
        {
        }
        public SuccessDataResult( string message) : base(true, default, message)
        {
        }
        public SuccessDataResult( ) : base(true, default)
        {
        }
    }
}
