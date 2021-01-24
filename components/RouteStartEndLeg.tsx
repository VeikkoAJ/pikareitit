import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';
import { routeLegColors } from '../styles/BasicColors';

type RouteStartEndLegProps = {
  headerText: string;
  iconName: 'home' | 'office-building';
  isOld?: boolean;
};

export default function RouteStartEndLeg({
  headerText,
  iconName,
  isOld = false,
}: RouteStartEndLegProps) {
  return (
    <View
      style={[
        currentRouteStyles.legStatic,
        {
          alignItems: 'flex-end',
          flexDirection: 'row',
          backgroundColor: isOld
            ? routeLegColors.lightVisited
            : routeLegColors.light,
        },
      ]}
    >
      <Text style={currentRouteStyles.headerText}>{headerText}</Text>
      <MaterialCommunityIcons name={iconName} size={30} color="white" />
    </View>
  );
}
