import { BrandService } from './../../../../services/brand.service';
import { ColorService } from './../../../../services/color.service';
import { Color } from './../../../../models/color';
import { Brand } from './../../../../models/brand';
import { CarService } from './../../../../services/car.service';
import { ResponseModel } from './../../../../models/responseModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  addForm: FormGroup;
  message: ResponseModel;
  brands: Brand[] = this.brandService.allBrands;
  colors: Color[] = this.colorService.allColors;
  files: File[] = null;
  formData: FormData = new FormData();

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.createAddForm();
  }

  ngDoCheck() {
    if (this.brandService.allBrands !== this.brands) {
      this.brands = this.brandService.allBrands;
    }
    if (this.colorService.allColors !== this.colors) {
      this.colors = this.colorService.allColors;
    }
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      colorId: ['', [Validators.required]],
      brandId: ['', [Validators.required]],
      modelYear: ['', [Validators.required]],
      dailyPrice: ['', [Validators.required]],
      description: ['', [Validators.required]],
      findexPuan: ['', [Validators.required]],
      image: [''],
    });
  }

  handleFileInput(e: any) {
    for (let j = 0; j < e.target.files.length; j++) {
      let fileItem = e.target.files[j];
      // this.files.push(fileItem);

      this.formData.append('image', fileItem);
    }
  }

  add() {
    if (this.addForm.valid) {
      // const formData = new FormData();
      this.formData.append('colorId', this.addForm.value.colorId);
      this.formData.append('brandId', this.addForm.value.brandId);
      this.formData.append('dailyPrice', this.addForm.value.dailyPrice);
      this.formData.append('findexPuan', this.addForm.value.findexPuan);
      this.formData.append('description', this.addForm.value.description);
      // this.formData.append('image', this.files, this.files.name);
      this.formData.append('modelYear', this.addForm.value.modelYear);

      this.carService.add(this.formData).subscribe(
        () => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.message = { message: 'Form is not valid', success: false };
    }
  }
}
