import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route, RouteKeyPair } from '../types';

// Dirty fix for using 2 different database modules for android and web
// eslint-disable-next-line import/extensions
import { db } from '../services/ImportPouchDB';

const testRoute1: Route = {
  routeName: 'Esimerkkireitti',
  description: 'testaukseen ja esittelyyn',
  originPlace: 'toimisto',
  finalDestination: 'koti',
  startWalkDuration: 1.3 * 60,
  routeTransportLegRows: [
    {
      routeLegs: [
        {
          from: {
            address: 'Tarvaspääntie, Espoo',
            lat: 60.2115478,
            lon: 24.8292963,
          },
          to: {
            address: 'Leppävaaran asema, Espoo',
            lat: 60.2193775,
            lon: 24.8113851,
          },
          transportModes: [{ mode: 'BUS' }],
        },
      ],
      middleSector: 'single',
    },
    {
      routeLegs: [
        {
          from: {
            address: 'Leppävaaran asema, Espoo',
            lat: 60.2193775,
            lon: 24.8113851,
          },
          to: {
            address: 'Pasilan asema, Helsinki',
            lat: 60.1986935,
            lon: 24.9345064,
          },
          transportModes: [{ mode: 'RAIL' }],
        },
      ],
      middleSector: 'single',
    },
    {
      routeLegs: [
        {
          from: {
            address: 'Pasilan asema, Helsinki',
            lat: 60.1986935,
            lon: 24.9345064,
          },
          to: {
            address: 'Pukinmäen asema, Helsinki',
            lat: 60.2424651,
            lon: 24.9917559,
          },
          secondaryTo: {
            address: 'Malmin asema, Helsinki',
            lat: 60.2506078,
            lon: 25.0094086,
          },
          transportModes: [{ mode: 'RAIL' }],
        },
      ],
      middleSector: 'split',
    },
    {
      routeLegs: [
        {
          from: {
            address: 'Pukinmäen asema, Helsinki',
            lat: 60.2424651,
            lon: 24.9917559,
          },
          to: {
            address: 'Syystie 19, Helsinki',
            lat: 60.2567313,
            lon: 24.9973389,
          },
          transportModes: [{ mode: 'BUS' }],
        },
        {
          from: {
            address: 'Malmin asema, Helsinki',
            lat: 60.2506078,
            lon: 25.0094086,
          },
          to: {
            address: 'Syystie 19, Helsinki',
            lat: 60.2567313,
            lon: 24.9973389,
          },
          transportModes: [{ mode: 'BUS' }],
        },
      ],
      middleSector: 'merge',
    },
  ],
};
type DatabaseContextValues =
  | undefined
  | {
      getRoute: (routeId: string) => Promise<RouteKeyPair | undefined>;
      getLatestRoute: () => Promise<RouteKeyPair | undefined>;
      getRoutes: () => Promise<RouteKeyPair[] | undefined>;
      setLatestRoute: (routeId: string) => void;
      setRoute: (id: string, route: Route) => void;
      deleteRoute: (id: string) => void;
    };

export function UseRouteDatabase() {
  const [latestRouteId, setLatestRouteId] = useState<string | undefined>(
    undefined
  );
  // TODO check if database isn't empty
  /** Ads example routes */
  const setExampleRoute = async () => {
    try {
      const response = await db.get('userExampleRoute');
    } catch (error) {
      console.log(error);
      if (error.message === 'missing') {
        await db.put({
          _id: 'userExampleRoute',
          route: JSON.stringify(testRoute1),
        });
      }
    }
  };

  useEffect(() => {
    const getLatestRouteKey = async () => {
      try {
        const key = await AsyncStorage.getItem('latestRoute');
        if (key !== null) {
          setLatestRouteId(key);
        }
      } catch (e) {}
    };
    getLatestRouteKey();
  }, []);

  useEffect(() => {
    const storeLatestRouteKey = async () => {
      try {
        if (latestRouteId !== undefined) {
          await AsyncStorage.setItem('latestRoute', latestRouteId);
        }
      } catch (e) {
        console.log('saving latestRouteKey failed', e);
      }
    };
    storeLatestRouteKey();
  }, [latestRouteId]);

  const getRoute = async (
    routeId: string
  ): Promise<RouteKeyPair | undefined> => {
    try {
      const response = await db.get(routeId);
      return {
        route: JSON.parse(response.route),
        key: response._id,
      };
    } catch (e) {
      console.log('getting latest route failed', e);
      return undefined;
    }
  };

  const getLatestRoute = async (): Promise<RouteKeyPair | undefined> => {
    if (latestRouteId === undefined) {
      return undefined;
    }
    try {
      const { _id, route } = await db.get(latestRouteId);
      return {
        route: JSON.parse(route),
        key: _id,
      };
    } catch (e) {
      console.log('getting latest route failed', e);
      return undefined;
    }
  };

  const getRoutes = async (): Promise<RouteKeyPair[] | undefined> => {
    try {
      const response = await db.allDocs({
        include_docs: true,
        startkey: 'user',
        endkey: 'user\ufff0',
      });
      if (response.rows.length > 0) {
        return response.rows.map(({ doc: { _id, route } }) => ({
          route: JSON.parse(route),
          key: _id,
        }));
      }
      return undefined;
    } catch (e) {
      console.log('getting all routes failed', e);
      return undefined;
    }
  };

  const setLatestRoute = (routeId: string) => {
    setLatestRouteId(routeId);
  };

  const setRoute = async (id: string, route: Route) => {
    db.put({
      _id: id,
      route: JSON.stringify(route),
    }).catch((err) => {
      console.log(err);
    });
  };

  const deleteRoute = async (routeIdd: string) => {
    console.log('deleting');
    try {
      const response = await db.get(routeIdd);
      await db.remove(response);
    } catch (e) {
      console.log('error in deleting route', e);
    }
  };

  /** Pass database hooks down with context.provider from root */
  const databaseContextValues: DatabaseContextValues = {
    getLatestRoute,
    getRoute,
    getRoutes,
    setLatestRoute,
    setRoute,
    deleteRoute,
  };

  return {
    setExampleRoute,
    databaseContextValues,
  };
}

export const DatabaseContext = React.createContext<DatabaseContextValues>(
  undefined
);
