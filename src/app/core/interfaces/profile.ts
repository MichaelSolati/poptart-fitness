export interface IActivity {
  count: number;
  name: string;
}

export interface IBadge {
  description: string;
  name: string;
  progress: number;
}

export interface IProfile {
  activities?: IActivity[];
  badges: IBadge[];
  email: string;
  name: string;
  photoURL: string;
  uid: string;
  $key?: string;
}
