import React, { useContext, useEffect, useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Route, RouteKeyPair } from '../types';
import { basicStyles, listStyles } from '../styles/BasicColors';
import { RootTabParamList } from '../NavigationTypes';
import { DatabaseContext } from '../hooks/UseRouteDatabase';

// TODO move this to types after async storage is working
interface HomeScreenScreenProps {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Home'>;
  route: RouteProp<RootTabParamList, 'Current route'>;
}

export function HomeScreen({ navigation, route }: HomeScreenScreenProps) {
  const [lastRouteKeyPair, setLastRouteKeyPair] = useState<
    RouteKeyPair | undefined
  >(undefined);
  const useRouteDatabase = useContext(DatabaseContext);

  useEffect(() => {
    async function getLastRoute() {
      try {
        const fetchedRoute = await useRouteDatabase?.getLatestRoute();
        if (fetchedRoute !== undefined) {
          setLastRouteKeyPair(fetchedRoute);
        }
      } catch (e) {
        console.log('error fetching last route from async storage', e);
      }
    }
    getLastRoute();
  }, [useRouteDatabase]);

  const loadActiveRoute = () => {
    if (!lastRouteKeyPair) {
      ToastAndroid.showWithGravity(
        'no recently used routes',
        200,
        ToastAndroid.SHORT
      );
      return;
    }
    if (lastRouteKeyPair) {
      navigation.navigate('Current route', {
        routeKey: lastRouteKeyPair.key,
      });
    }
  };

  // TODO add top bar
  return (
    <View style={basicStyles.background}>
      <View>
        <Text style={basicStyles.charcoalHeader}>Welcome</Text>
      </View>
      <View style={{ minHeight: 30 }} />
      <View style={[listStyles.listContainer, { minHeight: 120 }]}>
        <Text style={listStyles.listHeader}>Recent route:</Text>
        <TouchableOpacity style={listStyles.listItem} onPress={loadActiveRoute}>
          <Text style={listStyles.listItemHeader}>
            {lastRouteKeyPair !== undefined
              ? lastRouteKeyPair.route.routeName
              : 'No recently viewed route'}
          </Text>
          {lastRouteKeyPair !== undefined ? (
            <Text>{`${lastRouteKeyPair.route.originPlace}->${lastRouteKeyPair.route.finalDestination}`}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[listStyles.listContainer]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingEnd: 5,
          }}
        >
          <Text style={[listStyles.listHeader, { borderBottomWidth: 0 }]}>
            Press here for the tutorial
          </Text>
          <Text style={{ fontSize: 23, textAlign: 'right' }}> 💡</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[listStyles.listContainer]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingEnd: 5,
          }}
        >
          <Text style={[listStyles.listHeader, { borderBottomWidth: 0 }]}>
            Settings
          </Text>
          <Text style={{ fontSize: 23, textAlign: 'right' }}> 🔧</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[listStyles.listContainer]}
        onPress={() =>
          navigation.navigate('Browse', { screen: 'Create route' })
        }
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingEnd: 5,
          }}
        >
          <Text style={[listStyles.listHeader, { borderBottomWidth: 0 }]}>
            Create new
          </Text>
          <Text style={{ fontSize: 23, textAlign: 'right' }}> +</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
