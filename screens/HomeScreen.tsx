import React, { useContext, useEffect, useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteKeyPair } from '../types';
import { RootTabParamList } from '../navigationTypes';
import { basicStyles, listStyles } from '../styles/BasicStyles';
import { DatabaseContext } from '../contextTypes';
import InstructionsModal from '../components/InstructionsModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { routeLegColors } from '../styles/BasicColors';

// TODO move this to types after async storage is working
interface HomeScreenScreenProps {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Home'>;
  route: RouteProp<RootTabParamList, 'Current route'>;
}

export default function HomeScreen({
  navigation,
  route,
}: HomeScreenScreenProps) {
  const [showInstructions, setShowInstructions] = useState(false);
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
        routeKey: lastRouteKeyPair.id,
      });
    }
  };

  // TODO add top bar
  return (
    <View style={basicStyles.base}>
      {showInstructions && (
        <InstructionsModal closeModal={() => setShowInstructions(false)} />
      )}
      <View>
        <Text style={[basicStyles.charcoalHeader, { marginBottom: 30 }]}>
          Pikareitit
        </Text>
      </View>
      <View style={[listStyles.container, { minHeight: 120 }]}>
        <Text style={listStyles.header}>Viimeisin reitti:</Text>
        <TouchableOpacity style={listStyles.item} onPress={loadActiveRoute}>
          <Text style={listStyles.itemHeader}>
            {lastRouteKeyPair !== undefined
              ? lastRouteKeyPair.route.routeName
              : 'ei viimeaikaisia reittejä'}
          </Text>
          {lastRouteKeyPair !== undefined ? (
            <Text>{`${lastRouteKeyPair.route.originPlace} → ${lastRouteKeyPair.route.finalDestination}`}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[listStyles.container]}
        onPress={() => setShowInstructions(true)}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingEnd: 5,
          }}
        >
          <Text style={[listStyles.header, { borderBottomWidth: 0 }]}>
            Ohjeet
          </Text>
          <Text style={{ fontSize: 23, textAlign: 'right' }}> 💡</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[listStyles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingEnd: 5,
          }}
        >
          <Text style={[listStyles.header, { borderBottomWidth: 0 }]}>
            Asetukset
          </Text>
          <Text style={{ fontSize: 23, textAlign: 'right' }}> 🔧</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[listStyles.container]}
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
          <Text style={[listStyles.header, { borderBottomWidth: 0 }]}>
            Luo uusi reitti
          </Text>
          <MaterialCommunityIcons
            name="layers-plus"
            size={28}
            color={routeLegColors.charCoalText}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[listStyles.container]}
        onPress={() => navigation.navigate('Browse', { screen: 'Browse' })}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingEnd: 5,
          }}
        >
          <Text style={[listStyles.header, { borderBottomWidth: 0 }]}>
            Selaa reittejä
          </Text>
          <MaterialCommunityIcons
            name="menu"
            size={28}
            color={routeLegColors.charCoalText}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
