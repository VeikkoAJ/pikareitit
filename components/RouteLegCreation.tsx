import { listForm, listStyles, routeLegColors } from '../styles/BasicColors';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  Route,
  RouteLegKeyPair,
  RouteTransportLeg,
  RouteTransportLegRow,
} from '../types';
import { RouteLegForm } from './RouteLegForm';
import { ListManipulationButton } from './ListManipulationButton';
import { UseRouteCreation } from '../hooks/UseRouteCreation';

export function RouteLegCreation() {
  const {
    routeLegKeyPairs,
    settingsIndex,
    appendRouteLeg,
    removeRouteLeg,
    moveRouteLeg,
    setRouteLeg,
    setNewSettingsIndex,
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
      {routeLegKeyPairs.map((routeLegKeyPair, i) => (
        <RouteLegForm
          key={routeLegKeyPair.key}
          routeLegKeyPair={routeLegKeyPair}
          showSettings={settingsIndex === i}
          setShowSettings={() => setNewSettingsIndex(i)}
          setHideSettings={() => setNewSettingsIndex(undefined)}
          removeRouteLeg={() => removeRouteLeg(i)}
          moveRouteLeg={(newIndex: number) => moveRouteLeg(i, i + newIndex)}
          setRouteLeg={(currentRouteLeg: RouteLegKeyPair) =>
            setRouteLeg(i, currentRouteLeg)
          }
        />
      ))}
      <ListManipulationButton
        buttonIcon="add"
        size={30}
        color={routeLegColors.light}
        onButtonPress={() => appendRouteLeg()}
      />
      <View key="prevent clipping" style={{ minHeight: 20 }} />
    </ScrollView>
  );
}
