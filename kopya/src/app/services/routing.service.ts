import { async } from '@angular/core/testing';
import { BrandService } from './brand.service';
import { ColorService } from './color.service';
import { CarService } from './car.service';
import { Car } from './../models/car';
import { Router } from '@angular/router';
import { Color } from './../models/color';
import { Brand } from './../models/brand';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  defaultColor: Color = {
    id: 0,
    name: '',
  };
  defaultBrand: Brand = {
    id: 0,
    name: '',
  };
  defaultCar: Car = {
    id: 0,
    brandId: 0,
    brandName: '',
    colorId: 0,
    colorName: '',
    dailyPrice: 0,
    description: '',
    isRentable: true,
    findexPuan: 0,
    images: [],
    modelYear: 0,
  };

  currentBrand!: Brand;
  currentColor!: Color;
  currentStatus!: any;
  currentCar!: Car;

  constructor(private router: Router) {}

  // Brand
  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;

    this.carRoute();
  }
  setCurrentBrandDefault() {
    this.currentBrand = this.defaultBrand;

    this.carRoute();
  }

  // Color
  setCurrentColor(color: Color) {
    this.currentColor = color;

    this.carRoute();
  }
  setCurrentColorDefault() {
    this.currentColor = this.defaultColor;

    this.carRoute();
  }

  // Car

  setCurrentCar(car: Car) {
    this.currentCar = car;

    this.carDetailRoute();
  }

  setCurrentCarDefault() {
    this.currentCar = this.defaultCar;

    this.carDetailRoute();
  }

  carRoute() {
    if (this.currentBrand?.id > 0 && this.currentColor?.id > 0) {
      this.router.navigate([
        `/brand/${this.currentBrand.name}-${this.currentBrand.id}/color/${this.currentColor.name}-${this.currentColor.id}`,
      ]);
    } else if (this.currentBrand?.id > 0) {
      this.router.navigate([
        `/brand/${this.currentBrand.name}-${this.currentBrand.id}`,
      ]);
    } else if (this.currentColor?.id > 0) {
      this.router.navigate([
        `/color/${this.currentColor.name}-${this.currentColor.id}`,
      ]);
    } else {
      this.router.navigate([``]);
    }
  }

  carDetailRoute() {
    if (this.currentCar?.id > 0) {
      this.router.navigate([
        `/cars/${this.currentCar?.id}-${this.currentCar?.description.replace(
          /\s/g,
          '-'
        )}`,
      ]);
    } else {
      this.router.navigate([``]);
    }
  }
}
