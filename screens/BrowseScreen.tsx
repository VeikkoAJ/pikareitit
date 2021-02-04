import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { RouteKeyPair } from '../types';
import { RouteNameList } from '../components/RouteNameList';
import { StackParamList } from '../navigationTypes';

import { basicStyles, listStyles } from '../styles/BasicStyles';
import { DatabaseContext } from '../contextTypes';

interface BrowseScreenProps {
  navigation: BottomTabNavigationProp<StackParamList, 'Browse'>;
  route: RouteProp<StackParamList, 'Browse'>;
}

export default function BrowseScreen({ navigation, route }: BrowseScreenProps) {
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
    <View style={[basicStyles.base, { paddingBottom: 40 }]}>
      <View style={{ marginBottom: 30 }}>
        <Text style={basicStyles.charcoalHeader}>Tallennetut reitit</Text>
      </View>

      <FlatList
        style={[listStyles.container, { paddingTop: 5, flex: 1 }]}
        data={routeKeyPairs}
        extraData={listChangeTracker}
        renderItem={({ item }) => (
          <RouteNameList
            name={item.route.routeName}
            originPlace={item.route.originPlace}
            finalDestination={item.route.finalDestination}
            setActiveRoute={() => loadActiveRoute(item.id)}
            editRoute={() => {
              navigation.navigate('Create route', {
                routeKey: item.id,
                tabNavigationNavigate: route.params.tabNavigationNavigate,
              });
            }}
            deleteRoute={() => {
              if (useRouteDatabase !== undefined) {
                useRouteDatabase.deleteRoute(item.id);
              }
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
          navigation.navigate('Create route', {
            routeKey: undefined,
            tabNavigationNavigate: route.params.tabNavigationNavigate,
          })
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
