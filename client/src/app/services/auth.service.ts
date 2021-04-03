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
        this.user.IsAdmin = this.isAdmin(token);
      }
    }
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
    token.Claims.map((claim: string) => {
      if (claim.toLocaleLowerCase() === 'admin') {
        result = true;
      }
    });
    return result;
  }
}
