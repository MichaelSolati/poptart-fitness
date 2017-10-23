import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixed'
})
export class FixedPipe implements PipeTransform {

  transform(value: number, args: number = 1): string {
    return value.toFixed(args);
  }

}
