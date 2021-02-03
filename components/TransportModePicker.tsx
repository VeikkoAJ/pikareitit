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

  const activeColor = (transportMode: TransportMode) => {
    if (transportModes.map((_) => _.mode).includes(transportMode.mode)) {
      return 'white';
    }
    return routeLegColors.lightVisited;
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

  return (
    <View style={[listForm.textInput, { flex: 1, flexWrap: 'wrap' }]}>
      {defaultTransportModes.map((transportMode) => (
        <TouchableOpacity
          key={transportMode.mode}
          style={{ alignItems: 'center' }}
          onPress={() => setTransportModes(mapTransportModes(transportMode))}
        >
          <TransportModeIcon
            transportMode={transportMode}
            size={26}
            color={activeColor(transportMode)}
          />
          <Text
            style={{
              color: activeColor(transportMode),
              fontSize: 12,
            }}
          >
            {underText(transportMode)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
