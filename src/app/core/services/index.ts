import { LocationService } from './location.service';
export { LocationService } from './location.service';
import { UserService } from './user.service';
export { UserService } from './user.service';
import { ProfilesService } from './profiles.service';
export { ProfilesService } from './profiles.service';

export const SERVICES: any[] = [
  LocationService,
  UserService,
  ProfilesService
];
