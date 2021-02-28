export type RouteMiddleSectorProps = {
  /** In seconds */
  travelTimes: number[];
  sign?: string;
};
export type TransportModeString =
  | 'BUS'
  | 'RAIL'
  | 'TRAM'
  | 'SUBWAY'
  | 'FERRY'
  | 'WALK'
  | 'FUNICULAR'
  | 'CABLE_CAR';

export type TransportMode = {
  mode: TransportModeString;
};

export type MiddleSector = 'single' | 'split' | 'two' | 'merge';

export type MapLocation = {
  address: string;
  lat: number | undefined;
  lon: number | undefined;
};

export type RouteTransportLeg = {
  from: MapLocation;
  to: MapLocation;
  secondaryTo?: MapLocation;
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
  id: string;
  rev?: string;
}

export interface RouteLegKeyPair {
  key: string;
  routeLeg: RouteTransportLeg;
}
