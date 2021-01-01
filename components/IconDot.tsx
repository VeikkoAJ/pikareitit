import { basicColors, routeLegColors } from '../styles/BasicColors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import React from 'react';
import { format } from 'date-fns';

type IconDotProps = {
  travelTime: number;
};

export function IconDot({ travelTime }: IconDotProps) {
  return (
    <View
      style={{
        marginVertical: 2.5,
        marginHorizontal: 5,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: routeLegColors.normal,
        borderRadius: 20,
        width: 40,
        height: 40,
        elevation: 1,
      }}
    >
      <Text
        style={{
          paddingTop: 2,
          fontSize: 18,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {(travelTime / 60).toPrecision(2)}
      </Text>
    </View>
  );
}
