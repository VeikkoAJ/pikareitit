import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { routeLegColors } from '../styles/BasicColors';
import { TransportModePicker } from './TransportModePicker';
import { ListManipulationButton } from './ListManipulationButton';
import { RouteTransportLeg, TransportMode, MapLocation } from '../types';
import AddressSearch from './AddressSearch';
import { StationsQueryData, StopsQueryData } from '../transitStopsQueryTypes';

interface RouteLegFormProps {
  routeLeg: RouteTransportLeg;
  stops: StopsQueryData | undefined;
  stations: StationsQueryData | undefined;
  showSettings: boolean;
  setShowSettings: (toggle: boolean) => void;
  addRouteLeg: () => void;
  removeRouteLeg: () => void;
  moveRouteLeg: (yOffset: number, xOffset: number) => void;
  setRouteLeg: (routeLeg: RouteTransportLeg) => void;
}

export function RouteLegForm({
  routeLeg,
  stops,
  stations,
  showSettings,
  setShowSettings,
  addRouteLeg,
  removeRouteLeg,
  moveRouteLeg,
  setRouteLeg,
}: RouteLegFormProps) {
  const [from, setFrom] = useState<MapLocation>(routeLeg.from);
  const [to, setTo] = useState<MapLocation>(routeLeg.to);
  const [secondaryTo, setSecondaryTo] = useState<MapLocation | undefined>(
    routeLeg.secondaryTo
  );
  const [transportModes, setTransportModes] = useState<TransportMode[]>(
    routeLeg.transportModes
  );

  useEffect(() => {
    setRouteLeg({
      from,
      to,
      secondaryTo,
      transportModes,
    });
    console.log(from, to, secondaryTo, transportModes);
  }, [transportModes, from, to, secondaryTo]);

  return (
    <Pressable
      style={{
        alignItems: 'stretch',
        flex: 1,
        marginBottom: 5,
        paddingBottom: 5,
        paddingHorizontal: 10,
        paddingTop: 5,
        backgroundColor: routeLegColors.light,
        borderRadius: 10,
        elevation: 1,
      }}
      onPress={() => setShowSettings(false)}
      onLongPress={() => setShowSettings(true)}
    >
      <View style={{ position: 'absolute', right: 0 }}>
        <ListManipulationButton
          buttonIcon="remove"
          size={16}
          color={routeLegColors.lightVisited}
          onButtonPress={() => removeRouteLeg()}
        />
        <ListManipulationButton
          buttonIcon="info"
          size={16}
          color={routeLegColors.lightVisited}
          onButtonPress={() => setShowSettings(!showSettings)}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginRight: 30,
          paddingBottom: 10,
          alignItems: 'stretch',
        }}
      >
        <AddressSearch
          name="lähtöpysäkki:"
          defaultValue={from.address}
          stops={stops}
          stations={stations}
          changeLocation={(location) => setFrom(location)}
        />
        <AddressSearch
          name="määränpään pysäkki:"
          defaultValue={to.address}
          stops={stops}
          stations={stations}
          changeLocation={(location) => setTo(location)}
        />
        <AddressSearch
          name="toinen määränpää"
          defaultValue={
            secondaryTo?.address === undefined ? '' : secondaryTo.address
          }
          stops={stops}
          stations={stations}
          changeLocation={(location) => setSecondaryTo(location)}
        />
      </View>
      <TransportModePicker
        transportModes={transportModes}
        setTransportModes={setTransportModes}
      />
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
