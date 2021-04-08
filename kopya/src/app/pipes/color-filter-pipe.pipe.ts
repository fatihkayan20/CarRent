import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilterPipe',
})
export class ColorFilterPipePipe implements PipeTransform {
  transform(value: Color[], ColorName: string): Color[] {
    return value?.filter(
      (x: Color) => x?.name.toLowerCase().indexOf(ColorName) !== -1
    );
  }
}
