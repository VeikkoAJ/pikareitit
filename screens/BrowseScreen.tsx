import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route, RouteKeyPair } from '../types';
import { basicStyles, listStyles } from '../styles/BasicColors';
import { RouteNameList } from '../components/RouteNameList';
import { StackParamList } from '../NavigationTypes';
import { DatabaseContext } from '../hooks/UseRouteDatabase';

interface BrowseScreenProps {
  navigation: BottomTabNavigationProp<StackParamList, 'Browse'>;
  route: RouteProp<StackParamList, 'Browse'>;
}

export function BrowseScreen({ navigation, route }: BrowseScreenProps) {
  const [routeKeyPairs, setRouteKeyPairs] = useState<RouteKeyPair[]>([]);
  const [activeRouteKey, setActiveRouteKey] = useState<string | undefined>(
    undefined
  );
  const databaseInfo = useContext(DatabaseContext);

  useEffect(() => {
    const getRouteKeyPairs = async () => {
      try {
        const fetchedRouteKeyPairs = await databaseInfo?.getRoutes();
        if (fetchedRouteKeyPairs !== undefined) {
          setRouteKeyPairs(fetchedRouteKeyPairs);
        }
      } catch (e) {
        console.log('error loading routes', e);
      }
    };
    getRouteKeyPairs();
  }, []);

  const loadActiveRoute = (routeKey: string) => {
    setActiveRouteKey(routeKey);
    // Markup caused by not properly defining tabNavigationNavigate as a route prop
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
        data={routeKeyPairs}
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
