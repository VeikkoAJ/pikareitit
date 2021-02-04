import React from 'react';
import { Route, RouteKeyPair } from './types';

export type DatabaseContextValues =
  | undefined
  | {
      /**
       * Returns a route from database
       * @param routeId Id of the route in database
       */
      getRoute: (routeId: string) => Promise<RouteKeyPair | undefined>;
      /**
       * Returns a route from database, if latest route id is saved in local asyncStorage
       */
      getLatestRoute: () => Promise<RouteKeyPair | undefined>;
      /**
       *
       */
      getRoutes: () => Promise<RouteKeyPair[] | undefined>;
      /**
       * Saves the id of the route to local asyncStorage
       * @param routeId id of the route
       */
      setLatestRoute: (routeId: string) => void;
      /**
       * Sets the route to database, rev needed for updating the dabase item
       * @param id id of the route in database
       * @param _rev current version, undefined for new routes
       * @param route data to be saved in database
       */
      setRoute: (id: string, _rev: string | undefined, route: Route) => void;
      /**
       * sets route with matching id to "deleted", preventing access
       * @param id id of the route
       */
      deleteRoute: (id: string) => void;
    };

export const DatabaseContext = React.createContext<DatabaseContextValues>(
  undefined
);

export type IsOldContextValues = boolean;
export const isOldContext = React.createContext<IsOldContextValues>(false);
