import { LatLngLiteral } from 'geokit';

export interface IEvent {
  activity: string;
  coordinates: LatLngLiteral;
  description: string;
  distance?: number;
  ends: number;
  hash: string;
  id?: string;
  placeId: string;
  starts: number;
  uid: string;
  $key?: string;
}
