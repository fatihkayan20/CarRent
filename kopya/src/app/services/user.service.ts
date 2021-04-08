import { apiUrl } from './../../environments/environments';
import { Customer } from './../models/customer';
import { UserForUpdate } from './userForUpdate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  updateUser(user: UserForUpdate, customer: Customer) {
    let url = apiUrl + '/users/update';
    return this.httpClient.post(url, { user, customer });
  }
}
