import { Brand } from './../../../../models/brand';
import { ResponseModel } from './../../../../models/responseModel';
import { BrandService } from './../../../../services/brand.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  updateForm: FormGroup;
  isFormCreated: boolean = false;
  brands: Brand[] = this.brandService.allBrands;
  message: ResponseModel;

  constructor(
    private brandService: BrandService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  createUpdateForm(brand: Brand) {
    this.updateForm = this.formBuilder.group({
      id: [brand.id],
      name: [brand.name, [Validators.required]],
    });
  }

  updateModal(brand: Brand) {
    this.createUpdateForm(brand);
    this.isFormCreated = true;
  }

  ngDoCheck() {
    if (this.brandService.allBrands !== this.brands) {
      this.brands = this.brandService.allBrands;
    }
  }

  update() {
    if (this.updateForm.valid) {
      this.brandService.editBrand(this.updateForm.value).subscribe(
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

  delete(brand: Brand) {
    if (window.confirm('Do you wanna delete this car?')) {
      this.brandService.delete(brand).subscribe(() => {
        this.brandService.getBrands();
      });
    }
  }
}
