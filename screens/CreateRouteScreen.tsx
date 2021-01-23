import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, CommonActions } from '@react-navigation/native';
import { StackParamList } from '../navigationTypes';
import { routeLegColors } from '../styles/BasicColors';
import { RouteLegCreation } from '../components/RouteLegCreation';
import { RouteTransportLegRow } from '../types';
import SaveRouteModal from '../components/SaveRouteModal';
import { basicStyles } from '../styles/BasicStyles';

interface CreateRouteScreenProps {
  navigation: BottomTabNavigationProp<StackParamList, 'Create route'>;
  route: RouteProp<StackParamList, 'Create route'>;
}

export default function CreateRouteScreen({
  navigation,
  route,
}: CreateRouteScreenProps) {
  const [routeTransportLegRows, setRouteTransportLegRows] = useState<
    RouteTransportLegRow[] | undefined
  >(undefined);
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={basicStyles.background}>
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
      <RouteLegCreation saveRoute={setRouteTransportLegRows} />
      {showModal && routeTransportLegRows && (
        <SaveRouteModal
          routeTransportLegRows={routeTransportLegRows}
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
