import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClipLoader } from 'react-spinners';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { RouteScreenTopBar } from '../components/RouteScreenTopBar';
import { RouteContainer } from '../components/RouteContainer';
import { basicColors, routeLegColors } from '../styles/BasicColors';
import { Route } from '../types';
import { RootTabParamList } from '../NavigationTypes';

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

  useEffect(() => {
    async function getRouteFromStorage() {
      try {
        if (route.params.routeKey === undefined) {
          console.log('RouteKey undefined');
          return;
        }
        const jsonFetchedRoute = await AsyncStorage.getItem(
          route.params.routeKey
        );
        if (jsonFetchedRoute !== null) {
          setTransportRoute(JSON.parse(jsonFetchedRoute));
          console.log('route set');
        }
      } catch (e) {
        console.log('error in fetching route:', e);
        setError(true);
      }
    }
    async function storeLastActiveRouteKey() {
      try {
        if (route.params.routeKey !== undefined) {
          await AsyncStorage.setItem('lastRouteKey', route.params.routeKey);
        }
      } catch (e) {
        console.log('failed to save last route key:', e);
      }
    }
    getRouteFromStorage();
    if (!transportRoute) {
      storeLastActiveRouteKey();
    }
  }, [route.params.routeKey]);

  return (
    <View
      style={{
        backgroundColor: basicColors.topBarLight,
        flex: 1,
      }}
    >
      <View
        style={{
          height: StatusBar.currentHeight,
          backgroundColor: 'black',
        }}
      />
      <View style={{ flex: 1 }}>
        <RouteScreenTopBar
          setSearchTime={(time: Date) => setSearchTime(time)}
        />
        {transportRoute ? (
          <RouteContainer
            currentRoute={transportRoute}
            searchTime={searchTime}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {error ? (
              <>
                <Text
                  style={{ paddingTop: 5, color: routeLegColors.charCoalText }}
                >
                  Something went wrong 😞 try restarting the app
                </Text>
              </>
            ) : (
              <>
                <ClipLoader color={routeLegColors.light} loading size={50} />
                {route.params.routeKey !== undefined ? (
                  <Text
                    style={{
                      paddingTop: 10,
                      color: routeLegColors.charCoalText,
                    }}
                  >
                    loading...
                  </Text>
                ) : (
                  <Text
                    style={{
                      paddingTop: 10,
                      color: routeLegColors.charCoalText,
                    }}
                  >
                    <Text>No route selected, </Text>
                    <Text
                      style={{ color: 'blue' }}
                      onPress={() => navigation.navigate('Browse')}
                    >
                      press here to select a route.
                    </Text>
                  </Text>
                )}
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
