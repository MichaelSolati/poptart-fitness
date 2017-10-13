import { LocationService } from './location.service';
export { LocationService } from './location.service';
import { PlacesService } from './places.service';
export { PlacesService } from './places.service';
import { UserService } from './user.service';
export { UserService } from './user.service';
import { BadgesService } from './badges.service';
export { BadgesService } from './badges.service';
import { ProfilesService } from './profiles.service';
export { ProfilesService } from './profiles.service';

export const SERVICES: any[] = [
  LocationService,
  PlacesService,
  UserService,
  BadgesService,
  ProfilesService
];
