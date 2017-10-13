import { ActivitiesService } from './activities.service';
export { ActivitiesService } from './activities.service';
import { BadgesService } from './badges.service';
export { BadgesService } from './badges.service';
import { LocationService } from './location.service';
export { LocationService } from './location.service';
import { PlacesService } from './places.service';
export { PlacesService } from './places.service';
import { ProfilesService } from './profiles.service';
export { ProfilesService } from './profiles.service';
import { UserService } from './user.service';
export { UserService } from './user.service';

export const SERVICES: any[] = [
  ActivitiesService,
  BadgesService,
  LocationService,
  PlacesService,
  ProfilesService,
  UserService,
];
