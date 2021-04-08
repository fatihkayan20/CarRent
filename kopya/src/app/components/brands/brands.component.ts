import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RoutingService } from './../../services/routing.service';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = this.brandService.allBrands;
  filterText: string = '';
  brandEditForm: FormGroup;
  brand: Brand;
  isBrandSetted: boolean = false;
  formMessage: any;

  constructor(
    private brandService: BrandService,
    private routingService: RoutingService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  createBrandEditForm() {
    this.brandEditForm = this.formBuilder.group({
      id: [this.routingService.currentBrand.id, Validators.required],
      name: [this.routingService.currentBrand.name, Validators.required],
    });
  }

  ngDoCheck() {
    if (this.routingService.currentBrand !== this.brand) {
      this.brand = this.routingService.currentBrand;
      this.createBrandEditForm();
      this.isBrandSetted = true;
    }
    if (this.brandService.allBrands !== this.brands) {
      this.brands = this.brandService.allBrands;
    }
  }

  setCurrentBrand(brand: Brand) {
    this.routingService.setCurrentBrand(brand);
  }

  setCurrentBrandDefault() {
    this.routingService.setCurrentBrandDefault();
  }

  delete(brand: Brand) {
    if (confirm('Are you sure to delete ' + brand.name + '?')) {
      this.brandService.delete(brand).subscribe(() => {});
    }
  }

  editBrand() {
    if (this.brandEditForm.valid) {
      this.brandService.editBrand(this.brandEditForm.value).subscribe(
        (res) => {
          this.formMessage = {
            message: 'Color editted succesfully.',
            success: true,
          };
        },
        (err) => {
          console.log(err);
          this.formMessage = err;
        }
      );
    } else {
      this.formMessage = { message: 'Form is not valid', success: false };
    }
  }

  isAdmin() {
    return this.authService.user.IsAdmin;
  }
}
