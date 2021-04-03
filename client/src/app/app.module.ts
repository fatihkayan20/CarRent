import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './components/cars/cars.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ColorsComponent } from './components/colors/colors.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RentModalComponent } from './components/rent-modal/rent-modal.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';

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
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    CarFilterPipePipe,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
