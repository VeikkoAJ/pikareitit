import React from 'react';
import { Station } from '../transitStopsQueryTypes';
import { MapLocation } from '../types';
import { Text, View } from 'react-native';

interface StopAndStationOSMProps {
  address: string | undefined;
  lat: number | undefined;
  lon: number | undefined;
  stops: Station[];
  stations: Station[];
  markerDescriptionPress: (location: MapLocation) => void;
  closeModal: () => void;
}

/**
 * Placeholder for react-native-maps for web testing
 * @param address
 * @param lat
 * @param lon
 * @param stops
 * @param stations
 * @param markerDescriptionPress
 * @param closeModal
 * @constructor
 */
export default function StopAndStationOSM({
  address,
  lat,
  lon,
  stops,
  stations,
  markerDescriptionPress,
  closeModal,
}: StopAndStationOSMProps) {
  return (
    <View>
      <Text>This is a placeholder</Text>
    </View>
  );
}
