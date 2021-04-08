import { apiUrl } from './../../environments/environments';
import { CarImage } from './../models/carImage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  constructor(private httpClient: HttpClient) {}

  deleteImages(images: CarImage[]) {
    console.log(images);
    let url = apiUrl + '/carimages/deleteImages';
    return this.httpClient.post(url, images);
  }

  uploadImages(images: FormData) {
    let url = apiUrl + '/carimages/uploadImages';
    return this.httpClient.post(url, images);
  }
}
