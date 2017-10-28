import { LocationService } from './location.service';
export * from './location.service';
import { PlacesService } from './places.service';
export * from './places.service';
import { UserService } from './user.service';
export * from './user.service';
import { ProfilesService } from './profiles.service';
export * from './profiles.service';
import { EventsService } from './events.service';
export * from './events.service';
export * from '../interfaces';

export const SERVICES: any[] = [
  LocationService,
  PlacesService,
  UserService,
  ProfilesService,
  EventsService
];
