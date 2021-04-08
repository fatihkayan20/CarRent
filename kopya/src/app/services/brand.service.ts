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
  allBrands: Brand[];
  constructor(private httpClient: HttpClient) {
    this.getBrands();
  }

  getBrands(name?: string) {
    let url = apiUrl + '/brands?';

    if (name !== undefined) {
      url += 'name=' + name + '&';
    }
    this.httpClient.get<ListResponseModel<Brand>>(url).subscribe((res) => {
      this.allBrands = res.data.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    });
  }

  add(brand: Brand) {
    let url = apiUrl + '/brands';
    return this.httpClient.post(url, brand);
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
