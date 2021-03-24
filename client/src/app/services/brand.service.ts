import { apiUrl } from './../../enviroments/enviroments';
import { Brand } from './../models/brand';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private httpClient: HttpClient) {}

  getBrands(name?: string): Observable<ListResponseModel<Brand>> {
    let url = apiUrl + '/brands?';

    if (name !== undefined) {
      url += 'name=' + name + '&';
    }
    return this.httpClient.get<ListResponseModel<Brand>>(url);
  }
}
