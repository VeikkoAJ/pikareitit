import React, { useEffect, useState } from 'react';
// import PouchDB from 'pouchdb-react-native'; //mobile
import PouchDB from 'pouchdb'; // web testing
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route, RouteKeyPair } from '../types';

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

export const testRoute: Route = {
  routeName: 'Porukoille',
  description: 'there is no description to this cursed shit',
  originPlace: 'Majurinkulma',
  finalDestination: 'Lehmustie',
  startWalkDuration: 2.3 * 60,
  routeTransportLegRows: [
    {
      routeLegs: [
        {
          from: 'Majurinkulma 2, Espoo::60.2112299,24.8230712',
          to: 'Leppävaaran asema, Espoo::60.2193775,24.8113851',
          transportModes: [{ mode: 'BUS' }, { mode: 'WALK' }],
        },
      ],
      middleSector: 'single',
    },
    {
      routeLegs: [
        {
          from: 'Leppävaaran asema, Espoo::60.2193775,24.8113851',
          to: 'Pasilan asema, Helsinki, Helsinki::60.1986935,24.9345064',
          transportModes: [{ mode: 'RAIL' }],
        },
      ],
      middleSector: 'single',
    },
    {
      routeLegs: [
        {
          from: 'Pasilan asema, Helsinki::60.1986935,24.9345064',
          to: 'Pukinmäen asema, Helsinki::60.2424651,24.9917559',
          secondaryTo: 'Malmin asema, Helsinki::60.2506078,25.0094086',
          transportModes: [{ mode: 'RAIL' }],
        },
      ],
      middleSector: 'split',
    },
    {
      routeLegs: [
        {
          from: 'Pukinmäen asema, Helsinki::60.2424651,24.9917559',
          to: 'Syystie 19, Helsinki::60.2567313,24.9973389',
          transportModes: [{ mode: 'BUS' }],
        },
        {
          from: 'Malmin asema, Helsinki::60.2506078,25.0094086',
          to: 'Syystie 19, Helsinki::60.2567313,24.9973389',
          transportModes: [{ mode: 'BUS' }],
        },
      ],
      middleSector: 'merge',
    },
  ],
};
const db = new PouchDB('routes');

export function UseRouteDatabase() {
  // TODO ADD localStorage saving for latestRoute
  const [latestRouteId, setLatestRouteId] = useState<string | undefined>(
    undefined
  );

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
  });

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

  const setup = () => {
    db.info().then((info) => {
      db.put({
        _id: 'userExampleRoute',
        route: JSON.stringify(testRoute),
      }).catch((err) => {
        console.log(err);
      });
    });
  };

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
      console.log('getting routes');
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

  const databaseContextValues: DatabaseContextValues = {
    getLatestRoute,
    getRoute,
    getRoutes,
    setLatestRoute,
    setRoute,
    deleteRoute,
  };

  return {
    setup,
    databaseContextValues,
  };
}

export const DatabaseContext = React.createContext<DatabaseContextValues>(
  undefined
);
