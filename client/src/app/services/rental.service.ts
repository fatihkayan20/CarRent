import { AuthService } from 'src/app/services/auth.service';
import { RentAddModel } from './../models/rentAddModel';
import { Payment } from './../models/payment';
import { SingleResponseModel } from './../models/singleResponseModel';
import { apiUrl } from './../../environments/environments';
import { Rental } from './../models/rental';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  rent(rentAdd: RentAddModel) {
    let url = apiUrl + '/rentals';

    rentAdd.rental.customerId = this.authService.user.CustomerId;

    return this.httpClient.post<SingleResponseModel<RentAddModel>>(
      url,
      rentAdd
    );
  }
}
