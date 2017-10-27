import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'activityRename'})
export class ActivityRename implements PipeTransform {
    transform(input: string) {
        switch (input) {
            case 'Park': {
                return 'Recreational Activities';
            }
            case 'Swim Area': {
                return 'Swimming';
            }
            case 'Trail': {
                return 'Backpacking';
            }
            case 'Forest': {
                return 'Geocaching';
            }
            case 'Trailered': {
                return 'Trailer Camping';
            }
        }
    }
}
