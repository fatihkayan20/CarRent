import { apiUrl } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Color } from './../models/color';
import { ListResponseModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  allColors: Color[];
  constructor(private httpClient: HttpClient) {
    this.getColors();
  }

  getColors(name?: string) {
    let url = apiUrl + '/colors?';
    if (name !== undefined) {
      url += 'name=' + name + '&';
    }
    this.httpClient.get<ListResponseModel<Color>>(url).subscribe((res) => {
      this.allColors = res.data.sort(function (a, b) {
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

  add(color: Color) {
    let url = apiUrl + '/colors';
    return this.httpClient.post(url, color);
  }

  editColor(color: Color) {
    let url = apiUrl + '/colors/update';
    return this.httpClient.post(url, color);
  }
  delete(color: Color) {
    let url = apiUrl + '/colors/delete';
    return this.httpClient.post(url, color);
  }
}
