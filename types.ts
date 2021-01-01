export type RouteMiddleSectorProps = {
  // In seconds
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
  startWalkDuration: number;
  routeTransportLegRows: RouteTransportLegRow[];
};

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
