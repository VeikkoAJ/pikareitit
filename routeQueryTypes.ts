type Leg = {
  mode: string;
  startTime: number;
  endTime: number;
  duration: number;
  realTime: boolean;
  from: {
    name: string;
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
  duration: number;
  legs: Leg[];
};
export type QueryData = {
  plan: {
    itineraries: Itinerary[];
  };
};
