import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { routeLegColors } from '../styles/BasicColors';
import { isOldContext, IsOldContextValues } from '../contextTypes';

interface IconDotProps {
  travelTime: number;
  showSign?: string;
}

export default function MinuteDot({ travelTime, showSign = '' }: IconDotProps) {
  const isOld = useContext<IsOldContextValues>(isOldContext);
  return (
    <View
      style={{
        marginVertical: 2.5,
        marginHorizontal: 5,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: isOld
          ? routeLegColors.normalVisited
          : routeLegColors.normal,
        borderRadius: 20,
        width: 40,
        height: 40,
        elevation: 1,
      }}
    >
      {!isOld && (
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
      )}
    </View>
  );
}
