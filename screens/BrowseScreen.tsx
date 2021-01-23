import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route, RouteKeyPair } from '../types';
import { RouteNameList } from '../components/RouteNameList';
import { StackParamList } from '../navigationTypes';
import { DatabaseContext } from '../hooks/UseRouteDatabase';
import { basicStyles, listStyles } from '../styles/BasicStyles';

interface BrowseScreenProps {
  navigation: BottomTabNavigationProp<StackParamList, 'Browse'>;
  route: RouteProp<StackParamList, 'Browse'>;
}

export function BrowseScreen({ navigation, route }: BrowseScreenProps) {
  const [routeKeyPairs, setRouteKeyPairs] = useState<RouteKeyPair[]>([]);
  const [listChangeTracker, setListChangeTracker] = useState<number>(0);
  const useRouteDatabase = useContext(DatabaseContext);

  useEffect(() => {
    const getRouteKeyPairs = async () => {
      try {
        const fetchedRouteKeyPairs = await useRouteDatabase?.getRoutes();
        if (fetchedRouteKeyPairs !== undefined) {
          setRouteKeyPairs(fetchedRouteKeyPairs);
        }
      } catch (e) {
        console.log('error loading routes', e);
      }
    };
    getRouteKeyPairs();
  }, [listChangeTracker]);

  const loadActiveRoute = (routeKey: string) => {
    // Markup caused by not properly defining tabNavigationNavigate as a route prop
    route.params.tabNavigationNavigate.navigate('Current route', {
      routeKey,
    });
  };

  return (
    <View style={[basicStyles.background, { paddingBottom: 80 }]}>
      <View>
        <Text style={basicStyles.charcoalHeader}>Tallennetut reitit</Text>
      </View>
      <View style={{ minHeight: 30 }} />
      <FlatList
        style={[listStyles.container]}
        data={routeKeyPairs}
        extraData={listChangeTracker}
        renderItem={({ item }) => (
          <RouteNameList
            name={item.route.routeName}
            originPlace={item.route.originPlace}
            finalDestination={item.route.finalDestination}
            setActiveRoute={() => loadActiveRoute(item.key)}
            deleteRoute={() => {
              useRouteDatabase.deleteRoute(item.key);
              setListChangeTracker(listChangeTracker + 1);
            }}
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
        style={[listStyles.container]}
        onPress={() =>
          navigation.navigate(
            'Create route',
            route.params.tabNavigationNavigate
          )
        }
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingEnd: 5,
          }}
        >
          <Text style={[listStyles.header, { borderBottomWidth: 0 }]}>
            Luo uusi reitti
          </Text>
          <Text
            style={[
              listStyles.header,
              { borderBottomWidth: 0, textAlign: 'right' },
            ]}
          >
            {' + '}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
