import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { RouteMiddleSectorProps } from '../types';
import { SmallDot } from './SmallDot';
import { MinuteDot } from './MinuteDot';

export function RouteMiddleMergeSector({
  travelTimes,
}: RouteMiddleSectorProps) {
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <View
        key="firstRow"
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 2 }} />
        <SmallDot />
        <View style={{ width: 142, height: 20 }} />
        <SmallDot />
      </View>
      <View
        key="secondRow"
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MinuteDot travelTime={travelTimes[0]} />
        <SmallDot />
        <SmallDot />
        <SmallDot />
        <SmallDot />
        <MinuteDot travelTime={travelTimes[1]} />
      </View>
      <SmallDot />
    </View>
  );
}
