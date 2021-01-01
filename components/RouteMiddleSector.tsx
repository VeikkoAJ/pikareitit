import React from 'react'
import { View } from 'react-native'
import { RouteMiddleSectorProps } from '../types'
import { SmallDot } from './SmallDot'
import { IconDot } from './IconDot'

export default function RouteMiddleSector({
  travelTime,
}: RouteMiddleSectorProps) {
  return (
    <View
      style={{
        marginVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
      }}
    >
      <SmallDot />
      <IconDot travelTime={travelTime} />
      <SmallDot />
    </View>
  )
}
