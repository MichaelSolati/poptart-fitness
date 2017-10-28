import { LatLngLiteral } from 'geokit';

export interface IPlace {
  activities: string[];
  coordinates: LatLngLiteral;
  description?: string;
  distance?: number;
  hash: string;
  id: string;
  name: string;
  wikipediaId?: number;
  $key?: string;
}
