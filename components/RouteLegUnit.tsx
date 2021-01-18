import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteTransportLegUnit } from '../types';
import { routeLegColors } from '../styles/BasicColors';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

interface RouteLegUnitProps {
  legUnit: RouteTransportLegUnit;
  showAdditional: boolean;
}

export function RouteLegUnit({
  legUnit,
  showAdditional = true,
}: RouteLegUnitProps) {
  /** Replaces the bus or train name with a walking icon */
  const walkIcon = () => (
    <MaterialCommunityIcons
      key={legUnit.startTime + legUnit.name}
      style={{
        alignSelf: 'flex-end',
        paddingBottom: 3,
      }}
      name="walk"
      size={18}
      color={routeLegColors.charCoalText}
    />
  );

  return (
    <View
      key={legUnit.startTime + legUnit.name}
      style={currentRouteStyles.legListRow}
    >
      {legUnit.name !== 'walk' ? (
        walkIcon()
      ) : (
        <Text
          key={legUnit.startTime + legUnit.name}
          style={[currentRouteStyles.listText, { fontWeight: 'bold' }]}
        >
          {legUnit.name}
        </Text>
      )}
      <Text key={`${legUnit.startTime + legUnit.name}text`}>
        <Text
          key={`${legUnit.startTime + legUnit.name}starTime`}
          style={[currentRouteStyles.listText, { fontWeight: 'bold' }]}
        >
          {`${format(legUnit.startTime, 'HH:mm')}`}
        </Text>
        {showAdditional && (
          <Text
            key={`${legUnit.startTime + legUnit.name}end time`}
            style={currentRouteStyles.listText}
          >
            {`→${format(legUnit.endTime, 'HH:mm')}`}
          </Text>
        )}
        {showAdditional && legUnit.secondaryEndTime && (
          <Text
            key={`${legUnit.startTime + legUnit.name}secondary time`}
            style={[currentRouteStyles.listText, { fontStyle: 'italic' }]}
          >
            {`→${format(legUnit.secondaryEndTime, 'HH:mm')}`}
          </Text>
        )}
      </Text>
    </View>
  );
}
