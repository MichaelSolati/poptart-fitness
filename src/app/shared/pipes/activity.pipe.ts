import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activity'
})
export class ActivityPipe implements PipeTransform {

  transform(input: any, args?: any): any {
    switch (input) {
      case 'Park':
        return 'Recreation';
      case 'Water Access':
        return 'Fishing';
      case 'Swim Area':
        return 'Swimming';
      case 'Trail':
        return 'Backpacking';
      case 'Forest':
        return 'Geocaching';
      case 'Trailered':
        return 'Camping';
      default: return input;
    }
  }
}
