import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { listForm, routeLegColors } from '../styles/BasicColors';
import { TransportModePicker } from './TransportModePicker';
import { ListManipulationButton } from './ListManipulationButton';
import { RouteTransportLeg, TransportMode, MapLocation } from '../types';
import AddressSearch from './AddressSearch';

interface RouteLegFormProps {
  routeLeg: RouteTransportLeg;
  showSettings: boolean;
  setShowSettings: () => void;
  setHideSettings: () => void;
  addRouteLeg: () => void;
  removeRouteLeg: () => void;
  moveRouteLeg: (yOffset: number, xOffset: number) => void;
  setRouteLeg: (routeLeg: RouteTransportLeg) => void;
}

export function RouteLegForm({
  routeLeg,
  showSettings,
  setShowSettings,
  setHideSettings,
  addRouteLeg,
  removeRouteLeg,
  moveRouteLeg,
  setRouteLeg,
}: RouteLegFormProps) {
  const [from, setFrom] = useState<MapLocation>({
    name: routeLeg.from.split(':')[0],
    lat: undefined,
    lon: undefined,
  });
  const [to, setTo] = useState<MapLocation>({
    name: routeLeg.to.split(':')[0],
    lat: undefined,
    lon: undefined,
  });
  const [secondaryTo, setSecondaryTo] = useState<MapLocation | undefined>({
    name:
      routeLeg.secondaryTo === undefined
        ? ''
        : routeLeg.secondaryTo.split(':')[0],
    lat: undefined,
    lon: undefined,
  });
  const [transportModes, setTransportModes] = useState<TransportMode[]>(
    routeLeg.transportModes
  );

  useEffect(() => {
    setRouteLeg({
      from: `${from.name}::${from.lon},${from.lat}`,
      to: `${to.name}::${to.lon},${to.lat}`,
      secondaryTo:
        secondaryTo === undefined
          ? undefined
          : `${secondaryTo.name}::${secondaryTo.lat},${secondaryTo.lon}`,
      transportModes,
    });
  }, [transportModes, from, to, secondaryTo]);

  return (
    <Pressable
      style={{
        flex: 1,
        marginBottom: 5,
        paddingBottom: 5,
        paddingHorizontal: 10,
        backgroundColor: routeLegColors.light,
        borderRadius: 10,
        elevation: 1,
      }}
      onPress={() => setHideSettings()}
      onLongPress={() => setShowSettings()}
    >
      <View style={{ marginRight: 30, flexWrap: 'wrap' }}>
        <AddressSearch
          name="from:"
          defaultValue={from.name}
          changeLocation={(location) => setFrom(location)}
        />
        <AddressSearch
          name="to:"
          defaultValue={to.name}
          changeLocation={(location) => setTo(location)}
        />
        <AddressSearch
          name="secondary to"
          defaultValue={secondaryTo?.name === undefined ? '' : secondaryTo.name}
          changeLocation={(location) => setSecondaryTo(location)}
        />
      </View>
      <TransportModePicker
        transportModes={transportModes}
        setTransportModes={setTransportModes}
      />
      <View style={{ position: 'absolute', right: 0 }}>
        <ListManipulationButton
          buttonIcon="remove"
          size={16}
          color={routeLegColors.lightVisited}
          onButtonPress={() => removeRouteLeg()}
        />
      </View>
      {showSettings && (
        <View
          key="settings bar"
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 50,
          }}
        >
          <ListManipulationButton
            buttonIcon="moveUp"
            size={16}
            color={routeLegColors.lightVisited}
            onButtonPress={() => moveRouteLeg(-1, 0)}
          />
          <ListManipulationButton
            buttonIcon="moveDown"
            size={16}
            color={routeLegColors.lightVisited}
            onButtonPress={() => moveRouteLeg(1, 0)}
          />
          <ListManipulationButton
            buttonIcon="add"
            size={16}
            color={routeLegColors.lightVisited}
            onButtonPress={() => addRouteLeg()}
          />
        </View>
      )}
    </Pressable>
  );
}
