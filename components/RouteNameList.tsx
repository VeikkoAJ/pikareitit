import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {routeLegColors} from '../styles/BasicColors';


interface RouteNameListProps {
  name: string,
  originPlace: string,
  finalDestination: string,
  setActiveRoute: () => void
}

export function RouteNameList({ name, originPlace, finalDestination, setActiveRoute}: RouteNameListProps) {

  return (
    <TouchableOpacity
      style={{
        backgroundColor: routeLegColors.light,
        borderRadius: 10
      }}
      onPress={() => setActiveRoute()}
    >
      <Text style={{fontSize: 24, color: 'white', paddingBottom: 5}}>{name}</Text>
      <Text style={{fontSize: 16, color: routeLegColors.charCoalText}}>{`${originPlace  }->${  finalDestination}`}</Text>
    </TouchableOpacity>
  )
}
