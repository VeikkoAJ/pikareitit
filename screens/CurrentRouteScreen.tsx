import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CurrentRouteTopBar from '../components/CurrentRouteTopBar';
import RouteContainer from '../components/RouteContainer';
import { Route } from '../types';
import { RootTabParamList } from '../navigationTypes';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';
import { DatabaseContext } from '../contextTypes';

interface CurrentRouteScreenProps {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Current route'>;
  route: RouteProp<RootTabParamList, 'Current route'>;
}

export default function CurrentRouteScreen({
  navigation,
  route,
}: CurrentRouteScreenProps) {
  const [timeShift, setTimeShift] = useState<number>(0);
  const [transportRoute, setTransportRoute] = useState<Route | undefined>(
    undefined
  );
  const [error, setError] = useState(false);
  const [noKey, setNoKey] = useState(false);
  const useRouteDatabase = useContext(DatabaseContext);
  useEffect(() => {
    async function getRouteFromStorage() {
      try {
        if (route.params.routeKey === undefined) {
          console.log('RouteKey undefined');
          setNoKey(true);
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
    <SafeAreaProvider style={[currentRouteStyles.base]}>
      <View style={{ flex: 1 }}>
        <CurrentRouteTopBar
          timeOffset={timeShift}
          setTimeOffset={(time: number) => setTimeShift(time)}
        />
        {transportRoute !== undefined ? (
          <RouteContainer
            currentRoute={transportRoute}
            timeOffset={timeShift}
          />
        ) : (
          <View style={currentRouteStyles.errorLoadingRouteView}>
            {route.params.routeKey !== undefined && !error && (
              <Text style={currentRouteStyles.basicText}>ladataan...</Text>
            )}
            {noKey && (
              <Text style={currentRouteStyles.basicText}>
                Ei valittua reittiä
              </Text>
            )}
            {error && (
              <Text style={currentRouteStyles.basicText}>
                Jotain meni pieleen 😞
              </Text>
            )}
            <Text
              style={{ color: 'blue' }}
              onPress={() =>
                navigation.navigate('Browse', { screen: 'Browse' })
              }
            >
              siirry tallennettuihin reitteihin
            </Text>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}
