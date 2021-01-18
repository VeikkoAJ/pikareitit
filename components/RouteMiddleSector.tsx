import React from 'react';
import { View } from 'react-native';
import { RouteMiddleSectorProps } from '../types';
import { SmallDot } from './SmallDot';
import { MinuteDot } from './MinuteDot';

export default function RouteMiddleSector({
  travelTimes,
}: RouteMiddleSectorProps) {
  return (
    <View style={{ alignItems: 'center' }}>
      <SmallDot />
      <MinuteDot travelTime={travelTimes[0]} />
      <SmallDot />
    </View>
  );
}
