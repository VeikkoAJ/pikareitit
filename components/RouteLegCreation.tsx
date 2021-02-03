import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { routeLegColors } from '../styles/BasicColors';
import { RouteLegForm } from './RouteLegForm';
import { ListManipulationButton } from './ListManipulationButton';
import { UseRouteCreation } from '../hooks/UseRouteCreation';
import { RouteTransportLeg, RouteTransportLegRow } from '../types';
import { formatRouteLegRows } from '../services/CreateRouteToSave';
import { listStyles } from '../styles/BasicStyles';
import UseTransitStopsQuery from '../hooks/UseTransitStopsQuery';

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

  const { stops, stations } = UseTransitStopsQuery();

  useEffect(() => {
    saveRoute(formatRouteLegRows(routeLegKeyPairRows));
  }, [routeLegKeyPairRows]);

  return (
    <ScrollView
      style={[
        listStyles.container,
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
            <React.Fragment key={`${routeLegKeyPair.key} fragment`}>
              {column > 0 && (
                <View
                  key={`${routeLegKeyPair.key} spacer`}
                  style={{ width: 5 }}
                />
              )}

              <RouteLegForm
                key={routeLegKeyPair.key}
                routeLeg={routeLegKeyPair.routeLeg}
                stops={stops}
                stations={stations}
                showSettings={
                  settingsIndex?.row === row && settingsIndex.column === column
                }
                setShowSettings={(toggle: boolean) =>
                  setNewSettingsIndex(toggle, row, column)
                }
                removeRouteLeg={() => removeRouteLeg(row, column)}
                addRouteLeg={() => addRouteLeg(true, row)}
                moveRouteLeg={(yOffset: number, xOffset: number) =>
                  moveRouteLeg(row, column, row + yOffset, column + xOffset)
                }
                setRouteLeg={(currentRouteLeg: RouteTransportLeg) =>
                  setRouteLeg(currentRouteLeg, row, column)
                }
              />
            </React.Fragment>
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
