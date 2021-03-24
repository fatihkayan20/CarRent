import { RoutingService } from './../../services/routing.service';
import { imageUrl } from './../../../enviroments/enviroments';
import { CarService } from './../../services/car.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  imageUrl = imageUrl;
  defaultImg = '/images/car-rent.png';

  constructor(
    private carService: CarService,
    private routingService: RoutingService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let brandName = this.activeRoute.snapshot.params['brandName']?.split(
      '-'
    )[1];
    let colorName = this.activeRoute.snapshot.params['colorName']?.split(
      '-'
    )[1];

    if (colorName && brandName) {
      this.getCarWithFilter(brandName, colorName);
    } else if (colorName) {
      this.getCarWithFilter(undefined, colorName);
    } else if (brandName) {
      this.getCarWithFilter(brandName, undefined);
    } else {
      this.getCarWithFilter(
        this.routingService.currentBrand?.id > 0
          ? this.routingService.currentBrand?.id
          : undefined,
        this.routingService.currentColor?.id > 0
          ? this.routingService.currentColor?.id
          : undefined,
        this.routingService.currentStatus?.id > 0
          ? this.routingService.currentStatus?.id
          : undefined
      );
    }
  }

  getCarWithFilter(brandId?: number, colorId?: number, status?: number) {
    this.carService
      .getCarWithFilter(brandId, colorId, status)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  setCurrentCar(car: Car) {
    this.routingService.setCurrentCar(car);
  }
}