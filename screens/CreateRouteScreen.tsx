import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, CommonActions } from '@react-navigation/native';
import { StackParamList } from '../navigationTypes';
import { routeLegColors } from '../styles/BasicColors';
import { RouteLegCreation } from '../components/RouteLegCreation';
import { Route, RouteKeyPair, RouteTransportLegRow } from '../types';
import SaveRouteModal from '../components/SaveRouteModal';
import { basicStyles } from '../styles/BasicStyles';
import { DatabaseContext } from '../contextTypes';

interface CreateRouteScreenProps {
  navigation: BottomTabNavigationProp<StackParamList, 'Create route'>;
  route: RouteProp<StackParamList, 'Create route'>;
}

export default function CreateRouteScreen({
  navigation,
  route,
}: CreateRouteScreenProps) {
  const [
    editedRouteTransportLegRows,
    setEditedRouteTransportLegRows,
  ] = useState<RouteTransportLegRow[] | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [routeKeyPair, setRouteKeyPair] = useState<RouteKeyPair | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(route.params.routeKey !== undefined);
  const useRouteDatabase = useContext(DatabaseContext);
  const getRouteInfo = () => {
    if (routeKeyPair !== undefined) {
      const { routeTransportLegRows, ...routeInfo } = routeKeyPair?.route;
      return routeInfo;
    }
    return undefined;
  };
  useEffect(() => {
    const getRoute = async () => {
      try {
        if (
          route.params.routeKey !== undefined &&
          useRouteDatabase !== undefined
        ) {
          const fetchedRoute = await useRouteDatabase.getRoute(
            route.params.routeKey
          );
          if (fetchedRoute !== undefined) {
            setRouteKeyPair(fetchedRoute);
            setLoading(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getRoute();
  }, []);

  return (
    <View style={basicStyles.base}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={basicStyles.charcoalHeader}>Tee uusi Reitti</Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            backgroundColor: routeLegColors.light,
          }}
          onPress={() => setShowModal(true)}
        >
          <Text style={basicStyles.whiteHeader}>Tallenna</Text>
        </TouchableOpacity>
      </View>
      <View style={{ minHeight: 30 }} />
      {!loading && (
        <RouteLegCreation
          loadedRoute={routeKeyPair?.route}
          saveRoute={setEditedRouteTransportLegRows}
        />
      )}

      {showModal && editedRouteTransportLegRows && (
        <SaveRouteModal
          routeTransportLegRows={editedRouteTransportLegRows}
          routeInfo={getRouteInfo()}
          routeId={routeKeyPair?._id}
          routeRev={routeKeyPair?._rev}
          closeModal={(saved: boolean) => {
            setShowModal(false);
            if (saved) {
              navigation.dispatch(
                CommonActions.reset({
                  routes: [{ name: 'Browse' }, { name: 'Browse' }],
                })
              );
            }
          }}
        />
      )}
    </View>
  );
}
