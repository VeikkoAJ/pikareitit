import { TransportMode } from '../types'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'

type RouteLegIconProps = {
  transportMode: TransportMode
  size: number
  color: string
}

export default function RouteLegIcon({
  transportMode,
  size,
  color,
}: RouteLegIconProps) {
  const iconName = () => {
    switch (transportMode.mode) {
      case 'BUS':
        return 'bus'
      case 'RAIL':
        return 'train'
      case 'TRAM':
        return 'tram'
      case 'SUBWAY':
        return 'subway'
      case 'FERRY':
        return 'ship'
      default:
        return 'cross'
    }
  }

  return <MaterialCommunityIcons name={iconName()} size={size} color={color} />
}
