import { View } from 'react-native';
import React, { useContext } from 'react';
import { routeLegColors } from '../styles/BasicColors';
import { isOldContext, IsOldContextValues } from '../contextTypes';

export default function SmallDot() {
  const isOld = useContext<IsOldContextValues>(isOldContext);

  return (
    <View
      style={{
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: isOld
          ? routeLegColors.lightVisited
          : routeLegColors.light,
        borderRadius: 10,
        width: 20,
        height: 20,
        elevation: 1,
      }}
    />
  );
}
