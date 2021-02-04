import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TransportMode } from '../types';
import TransportModeIcon from './TransportModeIcon';
import { routeLegColors } from '../styles/BasicColors';
import { listForm } from '../styles/BasicStyles';

interface TransportModePickerProps {
  transportModes: TransportMode[];
  setTransportModes: (transportModes: TransportMode[]) => void;
}

export function TransportModePicker({
  transportModes,
  setTransportModes,
}: TransportModePickerProps) {
  const defaultTransportModes: TransportMode[] = [
    { mode: 'BUS' },
    { mode: 'RAIL' },
    { mode: 'TRAM' },
    { mode: 'SUBWAY' },
    { mode: 'FERRY' },
    { mode: 'WALK' },
  ];

  const mapTransportModes = (transportMode: TransportMode) => {
    // if already included remove
    if (transportModes.map((_) => _.mode).includes(transportMode.mode)) {
      return transportModes.filter((_) => _.mode !== transportMode.mode);
    }
    return defaultTransportModes.filter(
      (defaultMode) =>
        transportModes.map((_) => _.mode).includes(defaultMode.mode) ||
        defaultMode.mode === transportMode.mode
    );
  };

  const activeColor = (transportMode: TransportMode, background: boolean) => {
    if (transportModes.map((_) => _.mode).includes(transportMode.mode)) {
      return !background ? routeLegColors.light : 'white';
    }
    return !background ? routeLegColors.lightVisited : routeLegColors.light;
  };
  const elevation = (transportMode: TransportMode) => {
    if (transportModes.map((_) => _.mode).includes(transportMode.mode)) {
      return 2;
    }
    return 0;
  };
  const bold = (transportMode: TransportMode) => {
    if (transportModes.map((_) => _.mode).includes(transportMode.mode)) {
      return 'bold';
    }
    return 'normal';
  };

  const underText = (mode: TransportMode) => {
    switch (mode.mode) {
      case 'BUS':
        return 'bussi';
      case 'RAIL':
        return 'juna';
      case 'TRAM':
        return 'spora';
      case 'SUBWAY':
        return 'metro';
      case 'FERRY':
        return 'lautta';
      default:
        return 'kävellen';
    }
  };

  // WALK mode is never rendered but always included in the final route

  return (
    <View
      style={[
        listForm.textInput,
        { flex: 1, flexWrap: 'wrap', justifyContent: 'space-evenly' },
      ]}
    >
      {defaultTransportModes
        .filter((transportMode) => transportMode.mode !== 'WALK')
        .map((transportMode) => (
          <TouchableOpacity
            key={transportMode.mode}
            style={{
              minWidth: '14%',
              paddingHorizontal: 4,
              paddingVertical: 2,
              alignItems: 'center',
              borderRadius: 8,
              elevation: elevation(transportMode),
              backgroundColor: activeColor(transportMode, true),
            }}
            onPress={() => setTransportModes(mapTransportModes(transportMode))}
          >
            <TransportModeIcon
              transportMode={transportMode}
              size={26}
              color={activeColor(transportMode, false)}
            />
            <Text
              style={{
                color: activeColor(transportMode, false),
                fontSize: 12,
                fontWeight: bold(transportMode),
              }}
            >
              {underText(transportMode)}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}
