import { RoutingService } from './../../services/routing.service';
import { imageUrl } from '../../../environments/environments';
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
  filterText: string = '';
  sortBy: string = null;

  constructor(
    private carService: CarService,
    private routingService: RoutingService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      let brandName = params['brandName']?.split('-')[
        this.activeRoute.snapshot.params['brandName']?.split.length - 1
      ];

      let colorName = params['colorName']?.split('-')[
        this.activeRoute.snapshot.params['colorName']?.split.length - 1
      ];

      if (colorName && brandName) {
        this.getCarWithFilter(brandName, colorName);
      } else if (colorName) {
        this.getCarWithFilter(undefined, colorName);
      } else if (brandName) {
        this.getCarWithFilter(brandName, undefined);
      } else {
        this.getCarWithFilter(undefined, undefined);
      }
    });
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

  sort(value: string) {
    this.sortBy = value;
  }
}
