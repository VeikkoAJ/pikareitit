export type RouteMiddleSectorProps = {
  // In seconds
  travelTimes: number[];
  sign?: string;
};

export type TransportMode = {
  mode: 'BUS' | 'RAIL' | 'TRAM' | 'SUBWAY' | 'FERRY' | 'WALK';
};

export type MiddleSector = 'single' | 'split' | 'two' | 'merge';

export type RouteTransportLeg = {
  from: string;
  to: string;
  secondaryTo?: string;
  transportModes: TransportMode[];
};

export type RouteTransportLegRow = {
  routeLegs: RouteTransportLeg[];
  middleSector: MiddleSector;
};

export type Route = {
  routeName: string;
  description: string;
  originPlace: string;
  finalDestination: string;
  startWalkDuration: number;
  routeTransportLegRows: RouteTransportLegRow[];
};

export interface RouteKeyPair {
  route: Route;
  key: string;
}

export interface RouteLegKeyPair {
  key: string;
  routeLeg: RouteTransportLeg;
}

export type MapLocation = {
  name: string;
  lat: number | undefined;
  lon: number | undefined;
};
