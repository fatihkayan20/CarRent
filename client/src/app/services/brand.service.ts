import { ResponseModel } from './../models/responseModel';
import { apiUrl } from '../../environments/environments';
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

  editBrand(brand: Brand) {
    let url = apiUrl + '/brands/update';
    return this.httpClient.post(url, brand);
  }

  delete(brand: Brand) {
    let url = apiUrl + '/brands/delete';
    return this.httpClient.post(url, brand);
  }
}
