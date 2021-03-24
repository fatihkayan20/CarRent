import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarsComponent } from './components/cars/cars.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CarsComponent },
  { path: 'cars/:carId', component: CarDetailComponent },
  { path: 'brand/:brandName', component: CarsComponent },
  { path: 'color/:colorName', component: CarsComponent },
  { path: 'brand/:brandName/color/:colorName', component: CarsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
