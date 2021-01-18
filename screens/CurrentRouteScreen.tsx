import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RouteScreenTopBar } from '../components/RouteScreenTopBar';
import { RouteContainer } from '../components/RouteContainer';
import { Route } from '../types';
import { RootTabParamList } from '../NavigationTypes';
import { DatabaseContext } from '../hooks/UseRouteDatabase';
import { routeLegColors } from '../styles/BasicColors';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

interface CurrentRouteScreenProps {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Current route'>;
  route: RouteProp<RootTabParamList, 'Current route'>;
}

export function CurrentRouteScreen({
  navigation,
  route,
}: CurrentRouteScreenProps) {
  const [searchTime, setSearchTime] = useState<Date>(new Date());
  const [transportRoute, setTransportRoute] = useState<Route | undefined>(
    undefined
  );
  const [error, setError] = useState(false);
  const useRouteDatabase = useContext(DatabaseContext);
  useEffect(() => {
    async function getRouteFromStorage() {
      try {
        if (route.params.routeKey === undefined) {
          console.log('RouteKey undefined');
          return;
        }
        const fetchedRoute = await useRouteDatabase?.getRoute(
          route.params.routeKey
        );
        if (fetchedRoute !== undefined) {
          setTransportRoute(fetchedRoute.route);
          useRouteDatabase?.setLatestRoute(route.params.routeKey);
        }
      } catch (e) {
        console.log('error in fetching route:', e);
        setError(true);
      }
    }
    getRouteFromStorage();
  }, [route.params.routeKey]);

  return (
    <SafeAreaProvider style={currentRouteStyles.background}>
      <View style={{ flex: 1 }}>
        <RouteScreenTopBar
          setSearchTime={(time: Date) => setSearchTime(time)}
        />
        {transportRoute !== undefined ? (
          <RouteContainer
            currentRoute={transportRoute}
            searchTime={searchTime}
          />
        ) : (
          <View style={currentRouteStyles.errorLoadingRouteView}>
            {route.params.routeKey !== undefined && !error && (
              <Text style={currentRouteStyles.basicText}>loading...</Text>
            )}
            {error && (
              <Text style={currentRouteStyles.basicText}>
                Something went wrong 😞 try restarting the app
              </Text>
            )}
            <Text
              style={{ color: 'blue' }}
              onPress={() =>
                navigation.navigate('Browse', { screen: 'Browse' })
              }
            >
              press here to browse saved routes.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}
