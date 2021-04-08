import { CarAddComponent } from './components/admin/car/car-add/car-add.component';
import { ColorAddComponent } from './components/admin/color/color-add/color-add.component';
import { BrandAddComponent } from './components/admin/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/admin/brand/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/admin/color/color-update/color-update.component';
import { CarUpdateComponent } from './components/admin/car/car-update/car-update.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarsComponent } from './components/cars/cars.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: CarsComponent },
      { path: 'cars/:carId', component: CarDetailComponent },
      { path: 'brand/:brandName', component: CarsComponent },
      { path: 'color/:colorName', component: CarsComponent },
      { path: 'brand/:brandName/color/:colorName', component: CarsComponent },
      { path: 'brand/:brandName/edit', component: CarsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'user/edit', component: UserEditComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminPanelComponent },
      { path: 'cars/add', component: CarAddComponent },
      { path: 'cars/update', component: CarUpdateComponent },
      { path: 'brands/add', component: BrandAddComponent },
      { path: 'brands/update', component: BrandUpdateComponent },
      { path: 'colors/add', component: ColorAddComponent },
      { path: 'colors/update', component: ColorUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
