import { Car } from './../models/car';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carSort',
})
export class CarSortPipe implements PipeTransform {
  transform(value: Car[], filter: string): Car[] {
    console.log(filter);

    if (filter === 'lowestPrice') {
      return (value = value?.sort((a, b) =>
        a.dailyPrice > b.dailyPrice ? 1 : b.dailyPrice > a.dailyPrice ? -1 : 0
      ));
    }

    if (filter === 'highestPrice') {
      return (value = value?.sort((a, b) =>
        a.dailyPrice < b.dailyPrice ? 1 : b.dailyPrice < a.dailyPrice ? -1 : 0
      ));
    }

    if (filter === 'alphabetical') {
      return (value = value?.sort(function (a, b) {
        var nameA = a.brandName.toLowerCase();
        var nameB = b.brandName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }));
    }
    return value;
  }
}
