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
import { UseRouteCreation } from '../hooks/UseRouteCreation';
import index from '@react-native-community/masked-view';

export function RouteLegCreation() {
  const {
    routeLegs,
    settingsIndex,
    appendRouteLeg,
    removeRouteLeg,
    moveRouteLeg,
    changeSettingsIndex,
  } = UseRouteCreation();

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
      {routeLegs.map((routeLeg, i) => (
        <RouteLegForm
          key={routeLeg.from}
          routeLeg={routeLeg}
          showSettings={settingsIndex === i}
          setShowSettings={() => changeSettingsIndex(i)}
          setHideSettings={() => changeSettingsIndex(undefined)}
          removeRouteLeg={() => removeRouteLeg(i)}
          moveForm={(oldIndex: number, newIndex: number) =>
            moveRouteLeg(i, newIndex)
          }
        />
      ))}
      <AddRemoveButton
        addRemove="add"
        size={30}
        color={routeLegColors.light}
        onButtonPress={() => appendRouteLeg()}
      />
      <View key="prevent clipping" style={{ minHeight: 20 }} />
    </ScrollView>
  );
}
