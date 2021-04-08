import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilterPipe',
})
export class CarFilterPipePipe implements PipeTransform {
  transform(value: Car[], filter: string): Car[] {
    return value.filter(
      (x: Car) =>
        x.description.toLowerCase().indexOf(filter) !== -1 ||
        x.brandName.toLowerCase().indexOf(filter) !== -1 ||
        x.dailyPrice.toString().indexOf(filter) !== -1 ||
        x.modelYear.toString().indexOf(filter) !== -1 ||
        x.colorName.toLowerCase().indexOf(filter) !== -1
    );
  }
}
