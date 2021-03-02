using Core.Entities.Concrete;
using Entities.Concrete;
using FluentValidation;

namespace Business.ValidationRules.FulentValidation
{
    public class UserValidator:AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(u => u.Email).NotEmpty();
            RuleFor(u => u.Email).NotEmpty();
            RuleFor(u => u.Email).EmailAddress();
            RuleFor(u => u.FirstName).NotEmpty();
            RuleFor(u => u.LastName).NotEmpty();
        }
    }
}