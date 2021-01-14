import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route, RouteKeyPair } from '../types';
import { RouteNameList } from '../components/RouteNameList';
import {
  basicColors,
  basicStyles,
  listStyles,
  routeLegColors,
} from '../styles/BasicColors';
import { RootTabParamList } from '../NavigationTypes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

// TODO move this to types after async storage is working
interface HomeScreenScreenProps {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Home'>;
  route: RouteProp<RootTabParamList, 'Current route'>;
}

export function HomeScreen({ navigation, route }: HomeScreenScreenProps) {
  const [lastRouteKey, setLastRouteKey] = useState<string | undefined>(
    undefined
  );
  const [lastRoute, setLastRoute] = useState<Route | undefined>(undefined);

  useEffect(() => {
    async function getLastRoute() {
      try {
        const key = await AsyncStorage.getItem('lastRouteKey');
        if (key !== null) {
          setLastRouteKey(key);
          const routeJSON = await AsyncStorage.getItem(key);
          if (routeJSON !== null) {
            setLastRoute(JSON.parse(routeJSON));
          }
        }
      } catch (e) {
        console.log('error fetching last route from async storage', e);
      }
    }
    getLastRoute();
  }, []);

  const loadActiveRoute = () => {
    if (!lastRouteKey) {
      ToastAndroid.showWithGravity(
        'no recently used routes',
        200,
        ToastAndroid.SHORT
      );
      return;
    }
    if (lastRouteKey) {
      navigation.navigate('Current route', {
        routeKey: lastRouteKey,
      });
    }
  };

  // TODO add top bar
  return (
    <View
      style={{
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        height: '100%',
        marginTop: StatusBar.currentHeight,
        paddingHorizontal: 15,
        paddingTop: 25,
        backgroundColor: basicColors.topBarLight,
      }}
    >
      <View>
        <Text style={basicStyles.charcoalHeader}>Welcome</Text>
      </View>
      <View style={{ minHeight: 50 }} />
      <View style={[listStyles.listContainer, { minHeight: 120 }]}>
        <Text style={listStyles.listHeader}>Recent route:</Text>
        <TouchableOpacity
          style={listStyles.touchableListItem}
          onPress={loadActiveRoute}
        >
          <Text style={listStyles.listItemHeader}>
            {lastRoute ? lastRoute?.routeName : 'No recently viewed route'}
          </Text>
          {lastRoute ? (
            <Text>{`${lastRoute.originPlace}->${lastRoute.finalDestination}`}</Text>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={listStyles.touchableListItem}
          onPress={() => navigation.navigate('Browse')}
        >
          <Text style={listStyles.listItemHeader}>Browse more routes...</Text>
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
            Settings{' '}
          </Text>
          <Text style={{ fontSize: 23, textAlign: 'right' }}> 🔧</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
