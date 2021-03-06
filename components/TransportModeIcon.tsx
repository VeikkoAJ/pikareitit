import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransportMode } from '../types';

type RouteLegIconProps = {
  transportMode: TransportMode;
  size: number;
  color: string;
};

export default function TransportModeIcon({
  transportMode,
  size,
  color,
}: RouteLegIconProps) {
  const iconName = () => {
    switch (transportMode.mode) {
      case 'BUS':
        return 'bus';
      case 'RAIL':
        return 'train';
      case 'TRAM':
        return 'tram';
      case 'SUBWAY':
        return 'subway';
      case 'FERRY':
        return 'ferry';
      default:
        return 'walk';
    }
  };
  return <MaterialCommunityIcons name={iconName()} size={size} color={color} />;
}
