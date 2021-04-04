using Entities.Concrete;
using FluentValidation;

namespace Business.ValidationRules.FulentValidation
{
    public class PaymentValidator: AbstractValidator<Payment>
    {
        public PaymentValidator()
        {
            RuleFor(c => c.Owner).NotEmpty();
            RuleFor(c => c.Cvv).NotEmpty();
            RuleFor(c => c.Number).NotEmpty();
            RuleFor(c => c.ExpiryMonth).NotEmpty();
            RuleFor(c => c.ExpiryYear).NotEmpty();
        }
    }
}