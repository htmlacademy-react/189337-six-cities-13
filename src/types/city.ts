import { CITIES } from '../const';
import { Location } from './offers';

export type City = {
  name: string;
  location: Location;
}

export type Cities = typeof CITIES[number]
