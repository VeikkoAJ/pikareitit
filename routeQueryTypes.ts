import { TransportModeString } from './types';

type Stop = {
  platformCode: string | null;
} | null;

export type Leg = {
  mode: TransportModeString;
  startTime: number;
  endTime: number;
  duration: number;
  realTime: boolean;
  from: {
    name: string;
    stop: Stop;
  };
  to: {
    name: string;
  };
  route: {
    /** name of the transit route (eg. 550, P) or "WALK" when the route is traversed by walking  */
    shortName: string;
  };
};
type Itinerary = {
  legs: Leg[];
};
//TODO rename this
export type QueryData = {
  plan: {
    itineraries: Itinerary[];
  };
};
