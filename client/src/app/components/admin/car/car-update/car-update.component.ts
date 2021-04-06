import { CarImageService } from './../../../../services/car-image.service';
import { CarImage } from './../../../../models/carImage';
import { apiUrl, imageUrl } from './../../../../../environments/environments';
import { Router } from '@angular/router';
import { ResponseModel } from './../../../../models/responseModel';
import { ColorService } from './../../../../services/color.service';
import { Color } from './../../../../models/color';
import { Brand } from './../../../../models/brand';
import { BrandService } from './../../../../services/brand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Car } from './../../../../models/car';
import { CarService } from './../../../../services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  cars: Car[];
  currentCar: Car;
  updateForm: FormGroup;
  isFormCreated: boolean = false;
  brands: Brand[] = this.brandService.allBrands;
  colors: Color[] = this.colorService.allColors;
  message: ResponseModel;
  defaultUrl: string = imageUrl;
  selectedImagesForDelete: CarImage[] = [];
  formData: FormData = new FormData();

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.getCars();
  }

  ngDoCheck() {
    if (this.brandService.allBrands !== this.brands) {
      this.brands = this.brandService.allBrands;
    }
    if (this.colorService.allColors !== this.colors) {
      this.colors = this.colorService.allColors;
    }
  }

  getCars() {
    this.carService.getCarWithFilter().subscribe((res) => {
      console.log(res.data);
      this.cars = res.data;
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [this.currentCar.id],
      brandId: [this.currentCar.brandId, [Validators.required]],
      colorId: [this.currentCar.colorId, [Validators.required]],
      findexPuan: [this.currentCar.findexPuan, [Validators.required]],
      modelYear: [this.currentCar.modelYear, [Validators.required]],
      dailyPrice: [this.currentCar.dailyPrice, [Validators.required]],
      description: [this.currentCar.description, [Validators.required]],
    });
  }

  updateModal(car: Car) {
    this.currentCar = car;
    this.createUpdateForm();
    this.isFormCreated = true;
  }

  handleFileInput(e: any) {
    for (let j = 0; j < e.target.files.length; j++) {
      let fileItem = e.target.files[j];

      this.formData.append('images', fileItem);
    }
  }

  update() {
    if (this.updateForm.valid) {
      this.carService.update(this.updateForm.value).subscribe(
        () => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.message = {
        success: false,
        message: 'Form is not valid!',
      };
    }
  }

  delete(car: Car) {
    if (window.confirm('Do you wanna delete this car?')) {
      this.carService.delete(car).subscribe(() => {
        this.getCars();
      });
    }
  }

  confirmDeleteImage(image: CarImage) {
    if (window.confirm('Do you want to delete this image ?')) {
      this.selectedImagesForDelete.push(image);

      this.currentCar.images = this.currentCar.images.filter(
        (x) => x.imageId !== image.imageId
      );
    }
  }

  updateImages() {
    if (this.selectedImagesForDelete.length > 0) {
      this.carImageService
        .deleteImages(this.selectedImagesForDelete)
        .subscribe((res) => {
          window.location.reload();
        });
    }
    if (this.formData.get('images')) {
      this.formData.append('carId', this.currentCar.id.toString());
      this.carImageService.uploadImages(this.formData).subscribe((res) => {
        window.location.reload();
      });
    }
  }
}
