import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, CommonActions } from '@react-navigation/native';

import { StackParamList } from '../NavigationTypes';
import {
  basicColors,
  basicStyles,
  listForm,
  listStyles,
  routeLegColors,
} from '../styles/BasicColors';
import { RouteLegCreation } from '../components/RouteLegCreation';
import { RouteTransportLegRow } from '../types';
import SaveRouteModal from '../components/SaveRouteModal';

interface CreateRouteScreenProps {
  navigation: BottomTabNavigationProp<StackParamList, 'Create route'>;
  route: RouteProp<StackParamList, 'Create route'>;
}

export default function CreateRouteScreen({
  navigation,
  route,
}: CreateRouteScreenProps) {
  const [routeTransportLegRow, setRouteTransportLegRow] = useState<
    RouteTransportLegRow[] | undefined
  >(undefined);
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={basicStyles.background}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={basicStyles.charcoalHeader}>Create a new route</Text>
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: routeLegColors.light,
          }}
          onPress={() => setShowModal(true)}
        >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{ minHeight: 30 }} />
      <RouteLegCreation saveRoute={setRouteTransportLegRow} />
      {showModal && routeTransportLegRow && (
        <SaveRouteModal
          routeTransportLegRows={routeTransportLegRow}
          closeModal={() => {
            setShowModal(false);
            navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: 'Browse' }, { name: 'Browse' }],
              })
            );
          }}
        />
      )}
    </View>
  );
}
