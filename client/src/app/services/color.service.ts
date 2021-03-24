import { apiUrl } from './../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Color } from './../models/color';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private httpClient: HttpClient) {}

  getColors(name?: string): Observable<ListResponseModel<Color>> {
    let url = apiUrl + '/colors?';
    if (name !== undefined) {
      url += 'name=' + name + '&';
    }
    return this.httpClient.get<ListResponseModel<Color>>(url);
  }
}
