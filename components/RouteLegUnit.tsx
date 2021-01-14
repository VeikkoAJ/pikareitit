import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { RouteTransportLegUnit } from '../types';
import { routeLegColors } from '../styles/BasicColors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RouteLegUnitProps {
  legUnit: RouteTransportLegUnit;
  showAdditional: boolean;
}

export function RouteLegUnit({
  legUnit,
  showAdditional = true,
}: RouteLegUnitProps) {
  const routeName = () => {
    if (legUnit.name === 'Walk') {
      return (
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
    }
    return (
      <Text
        key={legUnit.startTime + legUnit.name}
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: routeLegColors.charCoalText,
        }}
      >
        {legUnit.name}
      </Text>
    );
  };

  return (
    <View
      key={legUnit.startTime + legUnit.name}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
      }}
    >
      {routeName()}
      <Text key={`${legUnit.startTime + legUnit.name}text`}>
        <Text
          key={legUnit.startTime + legUnit.name + 'starTime'}
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: routeLegColors.charCoalText,
          }}
        >
          {`${format(legUnit.startTime, 'HH:mm')}`}
        </Text>
        {showAdditional && (
          <Text
            key={legUnit.startTime + legUnit.name + 'end time'}
            style={{
              fontSize: 16,
              color: routeLegColors.charCoalText,
            }}
          >
            {`→${format(legUnit.endTime, 'HH:mm')}`}
          </Text>
        )}
        {showAdditional && legUnit.secondaryEndTime && (
          <Text
            key={legUnit.startTime + legUnit.name + 'secondary time'}
            style={{
              fontSize: 16,
              fontStyle: 'italic',
              color: routeLegColors.charCoalText,
            }}
          >
            {`→${format(legUnit.secondaryEndTime, 'HH:mm')}`}
          </Text>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  greyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: routeLegColors.charCoalText,
  },
});
