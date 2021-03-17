import React from 'react';
import { Text, View } from 'react-native';
import { format } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { routeLegColors } from '../styles/BasicColors';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

interface RouteLegUnitProps {
  legUnit: {
    name: string;
    platformCode?: string;
    startTime: number;
    endTime: number;
    secondaryEndTime?: number;
    realTime: boolean;
  };
  showAdditional: boolean;
}

export default function RouteLegUnit({
  legUnit,
  showAdditional,
}: RouteLegUnitProps) {
  /** Render walking icon for when no route is available */
  const walkIcon = () => (
    <MaterialCommunityIcons
      key={legUnit.startTime + legUnit.name}
      style={{
        alignSelf: 'flex-end',
        paddingTop: 3,
        paddingBottom: 2,
      }}
      name="walk"
      size={15}
      color={routeLegColors.charCoalText}
    />
  );

  return (
    <View
      key={legUnit.startTime + legUnit.name}
      style={[currentRouteStyles.legListRow]}
    >
      {legUnit.name === 'WALK' ? (
        walkIcon()
      ) : (
        <Text
          key={legUnit.startTime + legUnit.name}
          style={[currentRouteStyles.listTextCharcoal, { fontWeight: 'bold' }]}
          numberOfLines={1}
        >
          {legUnit.name}
        </Text>
      )}
      {legUnit.platformCode !== undefined && showAdditional && (
        <Text
          style={{
            color: routeLegColors.greenText,
            fontWeight: 'normal',
          }}
        >{`Raide ${legUnit.platformCode}`}</Text>
      )}

      <Text
        key={`${legUnit.startTime + legUnit.name} text`}
        style={currentRouteStyles.listText}
      >
        <Text
          key={`${legUnit.startTime + legUnit.name} starTime`}
          style={[currentRouteStyles.listTextPurple]}
        >
          {`${format(legUnit.startTime, 'HH:mm')}`}
        </Text>
        <Text
          key={`${legUnit.startTime + legUnit.name} end time`}
          style={currentRouteStyles.listTextPurple}
        >
          {`→${format(legUnit.endTime, 'HH:mm')}`}
        </Text>

        {legUnit.secondaryEndTime && (
          <Text
            key={`${legUnit.startTime + legUnit.name} secondary time`}
            style={[currentRouteStyles.listTextPurple, { fontStyle: 'italic' }]}
          >
            {`→${format(legUnit.secondaryEndTime, 'HH:mm')}`}
          </Text>
        )}
      </Text>
    </View>
  );
}
