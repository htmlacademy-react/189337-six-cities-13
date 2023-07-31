import { CITIES } from '../const';
import { Location } from './offers';

export type Cities = typeof CITIES[number]

export type City = {
  name: Cities;
  location: Location;
}

