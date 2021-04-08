import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandFilterPipe',
})
export class BrandFilterPipePipe implements PipeTransform {
  transform(value: Brand[], brandName: string): Brand[] {
    return value?.filter(
      (x: Brand) => x.name.toLowerCase().indexOf(brandName) !== -1
    );
  }
}
