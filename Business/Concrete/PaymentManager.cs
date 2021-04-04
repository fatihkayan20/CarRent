using Business.Abstract;
using Business.ValidationRules.FulentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;

namespace Business.Concrete
{
    public class PaymentManager:IPaymentService
    {
        
        [ValidationAspect(typeof(PaymentValidator))]
        public IResult Add(Payment payment)
        {
            return new SuccessResult("Payment successfully");
        }
        
        
    }
}