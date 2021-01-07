import React from 'react'
import { View } from 'react-native'
import { RouteMiddleSectorProps } from '../types'
import { SmallDot } from './SmallDot'
import { IconDot } from './IconDot'

export default function RouteMiddleSector({
  travelTimes,
}: RouteMiddleSectorProps) {
  return (
    <View
      style={{
        marginVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 5,
      }}
    >
      <SmallDot />
      <IconDot travelTime={travelTimes[0]} />
      <SmallDot />
    </View>
  )
}
