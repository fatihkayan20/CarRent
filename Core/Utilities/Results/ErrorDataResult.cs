using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Utilities.Results
{
    public class ErrorDataResult<T> : DataResult<T>
    {
        public ErrorDataResult(T data) : base(false, data)
        {
        }

        public ErrorDataResult(T data, string message) : base(false, data, message)
        {
        }
        public ErrorDataResult(string message) : base(false, default, message)
        {
        }
        public ErrorDataResult() : base(false, default)
        {
        }
    }
}
