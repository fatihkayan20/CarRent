import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarsComponent } from './components/cars/cars.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: CarsComponent },
  { path: 'cars/:carId', component: CarDetailComponent },
  { path: 'brand/:brandName', component: CarsComponent },
  { path: 'color/:colorName', component: CarsComponent },
  { path: 'brand/:brandName/color/:colorName', component: CarsComponent },
  { path: 'brand/:brandName/edit', component: CarsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
