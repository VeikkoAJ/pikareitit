import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { listStyles, routeLegColors } from '../styles/BasicColors';
import { RouteLegForm } from './RouteLegForm';
import { ListManipulationButton } from './ListManipulationButton';
import { UseRouteCreation } from '../hooks/UseRouteCreation';
import { RouteTransportLeg, RouteTransportLegRow } from '../types';
import { formatRouteLegRows } from '../services/CreateRouteToSave';

interface RouteLegCreationProps {
  saveRoute: (routeTransportLegRows: RouteTransportLegRow[]) => void;
}

export function RouteLegCreation({ saveRoute }: RouteLegCreationProps) {
  const {
    routeLegKeyPairRows,
    settingsIndex,
    addRouteLeg,
    removeRouteLeg,
    moveRouteLeg,
    setRouteLeg,
    setNewSettingsIndex,
  } = UseRouteCreation();

  useEffect(() => {
    saveRoute(formatRouteLegRows(routeLegKeyPairRows));
  }, [routeLegKeyPairRows]);

  return (
    <ScrollView
      style={[
        listStyles.listContainer,
        {
          paddingHorizontal: 0,
          paddingVertical: 0,
          paddingTop: 0,
          marginBottom: 50,
        },
      ]}
    >
      {routeLegKeyPairRows.map((routeLegKeyPairRow, row) => (
        <View
          key={`${routeLegKeyPairRow[0].key} row`}
          style={{ flexDirection: 'row' }}
        >
          {routeLegKeyPairRow.map((routeLegKeyPair, column) => (
            <RouteLegForm
              key={routeLegKeyPair.key}
              routeLeg={routeLegKeyPair.routeLeg}
              showSettings={
                settingsIndex?.row === row && settingsIndex.column === column
              }
              setShowSettings={() => setNewSettingsIndex(row, column)}
              setHideSettings={() => setNewSettingsIndex(undefined)}
              removeRouteLeg={() => removeRouteLeg(row, column)}
              addRouteLeg={() => addRouteLeg(true, row)}
              moveRouteLeg={(yOffset: number, xOffset: number) =>
                moveRouteLeg(row, column, row + yOffset, column + xOffset)
              }
              setRouteLeg={(currentRouteLeg: RouteTransportLeg) =>
                setRouteLeg(currentRouteLeg, row, column)
              }
            />
          ))}
        </View>
      ))}
      <ListManipulationButton
        buttonIcon="add"
        size={30}
        color={routeLegColors.light}
        onButtonPress={() => addRouteLeg(false)}
      />
      <View key="prevent clipping" style={{ minHeight: 20 }} />
    </ScrollView>
  );
}
