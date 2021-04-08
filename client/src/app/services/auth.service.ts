import { Customer } from './../models/customer';
import { ResponseModel } from './../models/responseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environments';
import { LoginUser } from '../models/loginUser';
import { RegisterUser } from '../models/registerUser';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User = {
    Claims: [],
    Email: '',
    Id: 0,
    IsAdmin: false,
    Name: '',
    CustomerId: 0,
    CompanyName: '',
  };
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) {}

  login(user: LoginUser) {
    let url = apiUrl + '/auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(url, user);
  }

  register(user: RegisterUser) {
    let url = apiUrl + '/auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(url, user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  setUser() {
    if (localStorage.getItem('token')) {
      let token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      if (token.exp < Math.floor(Date.now() / 1000)) {
        this.logout();
      } else {
        this.user = token;
        this.getCustomerByUser(this.user.Id);
        this.user.IsAdmin = this.isAdmin(token);
      }
    }
  }

  getCustomerByUser(userId: number) {
    let url = apiUrl + '/customers/user/' + userId;

    this.httpClient.get<SingleResponseModel<Customer>>(url).subscribe((res) => {
      this.user.CustomerId = res.data.id;
      this.user.CompanyName = res.data.companyName;
    });
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin(token: any) {
    let result = false;
    token.Claims?.toString()
      .split(',')
      ?.map((claim: string) => {
        if (claim.toLocaleLowerCase() === 'admin') {
          result = true;
        }
      });
    return result;
  }
}
