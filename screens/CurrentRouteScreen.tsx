import React, {useEffect, useState} from 'react';
import { StatusBar, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClipLoader} from 'react-spinners';
import { RouteScreenTopBar } from '../components/RouteScreenTopBar';
import { RouteContainer } from '../components/RouteContainer';
import {basicColors, routeLegColors} from '../styles/BasicColors';
import { Route } from '../types';



export function CurrentRouteScreen() {

  const [searchTime, setSearchTime] = useState<Date>(new Date(2020, 0, 5, 10))
  const [route, setRoute] = useState<Route |undefined>(undefined);

  useEffect( () => {
    async function getRouteFromStorage() {
      try {
        const jsonFetchedRoute = await AsyncStorage.getItem('wrongKey')
        if (jsonFetchedRoute !== null) {
          setRoute(JSON.parse(jsonFetchedRoute))
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
        {route ?
          <RouteContainer currentRoute={route} searchTime={searchTime} /> :
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
