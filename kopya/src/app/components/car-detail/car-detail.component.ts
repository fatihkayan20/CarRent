import { imageUrl } from '../../../environments/environments';
import { Car } from './../../models/car';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from './../../services/routing.service';
import { CarService } from './../../services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  cars: Car[] = [];
  imageUrl = imageUrl;
  defaultImg = '/images/car-rent.png';

  constructor(
    private carService: CarService,
    private routingService: RoutingService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(async (routeParams) => {
      let carId = this.activeRoute.snapshot.params['carId'].split('-')[0];
      if (carId) {
        this.getCarWithFilter(undefined, undefined, undefined, carId);
      } else {
        this.getCarWithFilter(
          undefined,
          undefined,
          undefined,
          this.routingService.currentCar?.id
        );
      }
    });
  }

  getCarWithFilter(
    brandId?: number,
    colorId?: number,
    status?: number,
    id?: number
  ) {
    this.carService
      .getCarWithFilter(brandId, colorId, status, id)
      .subscribe((response) => {
        console.log(response.data);
        this.cars = response.data;
      });
  }
}
