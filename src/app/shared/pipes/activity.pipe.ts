import { Pipe, PipeTransform } from '@angular/core';

/**
 * A class for the ActivityPipe
 */
@Pipe({
  name: 'activity'
})
export class ActivityPipe implements PipeTransform {

  /**
   * Changes a set of region activities into more appropriate names.
   * @param input String parameter to change.
   * @param args Optional arguments.
   * @returns Modified string.
   */
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
