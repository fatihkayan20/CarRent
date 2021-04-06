using System;
using System.Collections.Generic;
using System.Text;
using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FulentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Entities.Concrete;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;

namespace Business.Concrete
{
    public class UserManager:IUserService
    {
        private IUserDal _userDal;
        private ICustomerDal _customerDal;

        public UserManager(IUserDal userDal,ICustomerDal customerDal)
        {
            _userDal = userDal;
            _customerDal = customerDal;
        }
        public IDataResult<List<User>> GetAll()
        {
            return new SuccessDataResult<List<User>>(_userDal.GetAll());
        }

        public IDataResult<User> GetById(int id)
        {
            return new SuccessDataResult<User>(_userDal.Get(u => u.Id == id));
        }

        [ValidationAspect(typeof(UserValidator))]
        public IResult Add(User user)
        {
            _userDal.Add(user);
            return new SuccessResult(Messages.UserCreated);
        }

        public IResult Delete(User user)
        {
            _userDal.Delete(user);
            return new SuccessResult(Messages.UserDeleted);
        }

        public IResult Update(User user, Customer customer)
        {
            var currentUser = _userDal.Get(x => x.Id == user.Id);

            var userForUpdate = new User()
            {
                FirstName = user.FirstName,
                Email = user.Email,
                Id = user.Id,
                LastName = user.LastName,
                PasswordHash = currentUser.PasswordHash,
                PasswordSalt = currentUser.PasswordSalt,
                Status = currentUser.Status

            };

            _customerDal.Update(customer);
            _userDal.Update(userForUpdate);
            return new SuccessResult(Messages.UserUpdated);
        }

        public List<OperationClaim> GetClaims(User user)
        {
            return _userDal.GetClaims(user);
        }
        public User GetByMail(string email)
        {
            return _userDal.Get(u => u.Email == email);
        }
        
    }
}
