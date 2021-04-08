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
import { DatePipe } from '@angular/common';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { CarUpdateComponent } from './components/admin/car/car-update/car-update.component';
import { ColorUpdateComponent } from './components/admin/color/color-update/color-update.component';
import { BrandUpdateComponent } from './components/admin/brand/brand-update/brand-update.component';
import { BrandAddComponent } from './components/admin/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/admin/color/color-add/color-add.component';
import { CarAddComponent } from './components/admin/car/car-add/car-add.component';
import { CarSortPipe } from './pipes/car-sort.pipe';

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
    UserEditComponent,
    AdminPanelComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
    SidebarComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarSortPipe,
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
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
