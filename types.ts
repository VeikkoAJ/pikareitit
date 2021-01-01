export type RouteMiddleSectorProps = {
  // In milliseconds
  travelTime: number;
};

export type RouteTransportLegUnit = {
  name: string;
  startTime: number;
  realTime: boolean;
};

export type TransportMode = {
  mode: 'BUS' | 'RAIL' | 'TRAM' | 'SUBWAY' | 'FERRY' | 'WALK';
};

export type MiddleSector = 'single' | 'split' | 'two' | 'merge';

export type RouteTransportLeg = {
  from: string;
  to: string;
  transportModes: TransportMode[];
};

type RouteTransportLegRow = {
  routeLegs: RouteTransportLeg[];
  middleSector: MiddleSector;
  middleSectorTransportModes: TransportMode[];
};

export type Route = {
  routeName: string;
  description: string;
  startPlace: string;
  destination: string;
  routeTransportLegRows: RouteTransportLegRow[];
};

type Leg = {
  from: {
    name: string;
  };
  mode: string;
  route: {
    shortName: string;
  };
  startTime: number;
  endTime: number;
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
