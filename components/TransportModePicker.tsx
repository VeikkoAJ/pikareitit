import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransportMode } from '../types';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  basicColors,
  basicStyles,
  listForm,
  routeLegColors,
} from '../styles/BasicColors';
import RouteLegIcon from './RouteLegIcon';

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
      return 'red';
    }
    return routeLegColors.lightVisited;
  };

  return (
    <View style={[listForm.listTextInput, { flex: 1, flexWrap: 'wrap' }]}>
      {defaultTransportModes.map((transportMode) => (
        <TouchableOpacity
          key={transportMode.mode}
          style={{ alignItems: 'center' }}
          onPress={() => setTransportModes(mapTransportModes(transportMode))}
        >
          <RouteLegIcon
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
            {transportMode.mode}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
