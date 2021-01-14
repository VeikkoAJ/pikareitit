import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { listStyles, routeLegColors } from '../styles/BasicColors';

interface RouteNameListProps {
  name: string;
  originPlace: string;
  finalDestination: string;
  setActiveRoute: () => void;
}

export function RouteNameList({
  name,
  originPlace,
  finalDestination,
  setActiveRoute,
}: RouteNameListProps) {
  return (
    <TouchableOpacity
      style={listStyles.listItem}
      onPress={() => setActiveRoute()}
    >
      <Text style={[listStyles.listItemHeader, { borderBottomWidth: 0 }]}>
        {name}
      </Text>
      <Text style={{}}>{`${originPlace}->${finalDestination}`}</Text>
    </TouchableOpacity>
  );
}
