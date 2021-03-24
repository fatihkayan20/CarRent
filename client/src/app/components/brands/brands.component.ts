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
  brands: Brand[] = [];

  constructor(
    private brandService: BrandService,
    private route: Router,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((res) => {
      this.brands = res.data;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.routingService.setCurrentBrand(brand);
  }

  setCurrentBrandDefault() {
    this.routingService.setCurrentBrandDefault();
  }

  getBrandClass(brand: Brand) {
    if (brand === this.routingService.currentBrand) {
      return 'list-group-item btn active';
    } else {
      return 'list-group-item btn';
    }
  }
}
