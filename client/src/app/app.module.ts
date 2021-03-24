import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './components/cars/cars.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ColorsComponent } from './components/colors/colors.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RentModalComponent } from './components/rent-modal/rent-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    RentalsComponent,
    CarDetailComponent,
    ColorsComponent,
    BrandsComponent,
    NavbarComponent,
    RentModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
