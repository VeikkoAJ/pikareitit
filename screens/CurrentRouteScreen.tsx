import React, {useEffect, useState} from 'react';
import { StatusBar, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClipLoader} from 'react-spinners';
import { BottomTabNavigationProp  } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/native';
import { RouteScreenTopBar } from '../components/RouteScreenTopBar';
import { RouteContainer } from '../components/RouteContainer';
import {basicColors, routeLegColors} from '../styles/BasicColors';
import { Route } from '../types';
import {RootTabParamList} from '../NavigationTypes';


interface CurrentRouteScreenProps {
  navigate: BottomTabNavigationProp<
    RootTabParamList,
    'Current route'
    >;
  route: RouteProp<RootTabParamList, 'Current route'>
}

export function CurrentRouteScreen({ navigate, route }: CurrentRouteScreenProps) {

  const [searchTime, setSearchTime] = useState<Date>(new Date(2020, 0, 5, 10))
  const [transportRoute, setTransportRoute] = useState<Route |undefined>(undefined);

  useEffect( () => {
    async function getRouteFromStorage() {
      try {
        if (route.params.routeKey === undefined) {
          console.log("RouteKey undefined")
          return
        }
        const jsonFetchedRoute = await AsyncStorage.getItem(route.params.routeKey)
        if (jsonFetchedRoute !== null) {
          setTransportRoute(JSON.parse(jsonFetchedRoute))
        }
      } catch (e) {
        console.log("error in fetching route:", e)
      }
    }
    getRouteFromStorage()
  }, [])

  useEffect(() => {
    console.log('screen', searchTime)
  }, [searchTime])
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
        <RouteScreenTopBar setSearchTime={(time: Date) => setSearchTime(time)} />
        {transportRoute ?
          <RouteContainer currentRoute={transportRoute} searchTime={searchTime} /> :
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ClipLoader color={routeLegColors.light} loading size={50}/>
            <Text style={{ paddingTop: 5, color: routeLegColors.charCoalText}}>  Loading...</Text>
          </View>
          }

      </View>
    </View>
  );
}
