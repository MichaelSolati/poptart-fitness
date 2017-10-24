import { ActivitiesService } from './activities.service';
export { ActivitiesService } from './activities.service';
import { BadgesService } from './badges.service';
export { BadgesService } from './badges.service';
import { LocationService } from './location.service';
export { LocationService } from './location.service';
import { PlacesService } from './places.service';
export { PlacesService } from './places.service';
import { UserService } from './user.service';
export { UserService } from './user.service';
import { ProfilesService } from './profiles.service';
export { ProfilesService } from './profiles.service';
import { EventsService } from './events.service';
export { EventsService } from './events.service';

export const SERVICES: any[] = [
  ActivitiesService,
  LocationService,
  PlacesService,
  UserService,
  ProfilesService,
  BadgesService,
  EventsService
];
