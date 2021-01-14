import { listForm, listStyles, routeLegColors } from '../styles/BasicColors';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Route, RouteTransportLegRow } from '../types';
import { RouteLegForm } from './RouteLegForm';
import { AddRemoveButton } from './AddRemoveButton';

export function RouteLegCreation() {
  const [routeTransportLegRow, setRouteTransportLegRow] = useState<
    RouteTransportLegRow | undefined
  >(undefined);

  return (
    <ScrollView
      style={[
        listStyles.listContainer,
        {
          paddingHorizontal: 0,
          paddingVertical: 0,
          paddingTop: 0,
          maxHeight: '80%',
        },
      ]}
    >
      <RouteLegForm />
      <RouteLegForm />
      <RouteLegForm />
      <RouteLegForm />
      <AddRemoveButton
        addRemove="add"
        size={30}
        color={routeLegColors.light}
        onButtonPress={() => console.log('press')}
      />
      <View key="prevent clipping" style={{ minHeight: 20 }} />
    </ScrollView>
  );
}
