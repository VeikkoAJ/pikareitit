import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

type RouteStartEndLegProps = {
  headerText: string;
  iconName: string;
};

export default function RouteStartEndLeg({
  headerText,
  iconName,
}: RouteStartEndLegProps) {
  return (
    <View
      style={[
        currentRouteStyles.legStatic,
        { alignItems: 'flex-end', flexDirection: 'row' },
      ]}
    >
      <Text style={currentRouteStyles.headerText}>{headerText}</Text>
      <MaterialCommunityIcons name={iconName} size={30} color="white" />
    </View>
  );
}
