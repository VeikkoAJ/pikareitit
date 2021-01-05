import { basicColors, routeLegColors } from '../styles/BasicColors';
import { Text, View } from 'react-native';
import React from 'react';

interface IconDotProps {
  travelTime: number;
  showSign?: string
};

export function IconDot({ travelTime, showSign = ''}: IconDotProps) {

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
          fontSize: 16,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {showSign + (travelTime / 60).toPrecision(2)}
      </Text>
    </View>
  );
}
