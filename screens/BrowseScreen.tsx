import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route, RouteKeyPair } from '../types';
import {
  basicColors,
  basicStyles,
  listStyles,
  routeLegColors,
} from '../styles/BasicColors';
import { RouteNameList } from '../components/RouteNameList';
import { StackParamList } from '../NavigationTypes';

const testRoute: Route = {
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

interface BrowseScreenProps {
  navigation: BottomTabNavigationProp<StackParamList, 'Browse'>;
  route: RouteProp<StackParamList, 'Browse'>;
}

export function BrowseScreen({ navigation, route }: BrowseScreenProps) {
  const [routeKeys, setRouteKeys] = useState<string[]>([]);
  const [routes, setRoutes] = useState<RouteKeyPair[]>([]);
  const [activeRouteKey, setActiveRouteKey] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    async function getRouteKeys() {
      try {
        const keys = await AsyncStorage.getAllKeys();
        if (keys !== undefined) {
          setRouteKeys(keys);
          const fetchedRoutes = await AsyncStorage.multiGet(keys);
          if (fetchedRoutes !== undefined) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // TODO fix mapping
            setRoutes(
              fetchedRoutes
                .map((route) => {
                  if (route[1] !== null && route[1][0] === '{') {
                    console.log('route', route);
                    return {
                      route: JSON.parse(route[1]),
                      key: route[0],
                    };
                  }
                  return undefined;
                })
                .filter((_) => _ !== undefined)
            );
          }
        }
      } catch (e) {
        console.log('error fetching routes from async storage', e);
      }
    }
    getRouteKeys();
  }, []);

  const loadActiveRoute = (routeKey: string) => {
    setActiveRouteKey(routeKey);
    route.params.tabNavigationNavigate.navigate('Current route', {
      routeKey,
    });
  };

  const storeRoute = async (currentRoute: Route) => {
    try {
      const jsonRoute = JSON.stringify(currentRoute);
      await AsyncStorage.setItem('testKey', jsonRoute);
    } catch (e) {
      console.log('failed to save route:', e);
    }
  };

  // TODO add top bar
  return (
    <View style={[basicStyles.background, { paddingBottom: 80 }]}>
      <View>
        <Text style={basicStyles.charcoalHeader}>Saved routes</Text>
      </View>
      <View style={{ minHeight: 30 }} />
      <FlatList
        style={[listStyles.listContainer]}
        data={routes}
        renderItem={({ item }) => (
          <RouteNameList
            name={item.route.routeName}
            originPlace={item.route.originPlace}
            finalDestination={item.route.finalDestination}
            setActiveRoute={() => loadActiveRoute(item.key)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{ borderBottomWidth: 1, borderColor: 'black', minHeight: 1 }}
          />
        )}
        keyExtractor={(_) => _.key}
      />
      <TouchableOpacity
        style={[listStyles.listContainer]}
        onPress={() =>
          navigation.navigate(
            'Create route',
            route.params.tabNavigationNavigate
          )
        }
      >
        <Text style={[listStyles.listHeader, { borderBottomWidth: 0 }]}>
          <Text>Add new + </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
