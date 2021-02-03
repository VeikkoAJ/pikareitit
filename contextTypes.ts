import React from 'react';
import { Route, RouteKeyPair } from './types';

export type DatabaseContextValues =
  | undefined
  | {
      getRoute: (routeId: string) => Promise<RouteKeyPair | undefined>;
      getLatestRoute: () => Promise<RouteKeyPair | undefined>;
      getRoutes: () => Promise<RouteKeyPair[] | undefined>;
      setLatestRoute: (routeId: string) => void;
      setRoute: (id: string, _rev: string, route: Route) => void;
      deleteRoute: (id: string) => void;
    };

export const DatabaseContext = React.createContext<DatabaseContextValues>(
  undefined
);

export type IsOldContextValues = boolean;
export const isOldContext = React.createContext<IsOldContextValues>(false);
