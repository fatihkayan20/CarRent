import { Car } from './../models/car';
import { apiUrl } from './../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCarWithFilter(
    brandId?: number,
    colorId?: number,
    status?: number,
    id?: number
  ): Observable<ListResponseModel<Car>> {
    let newPath = apiUrl + '/cars?';

    if (brandId !== undefined) {
      newPath += 'brandId=' + brandId + '&';
    }
    if (colorId !== undefined) {
      newPath += 'colorId=' + colorId + '&';
    }
    if (status !== undefined) {
      newPath += 'status=' + status + '&';
    }
    if (id !== undefined) {
      newPath += 'id=' + id + '&';
    }

    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
