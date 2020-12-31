import React from 'react'
import { View } from 'react-native'
import { RouteMiddleSectorProps } from '../types'
import { SmallDot } from './SmallDot'
import { IconDot } from './IconDot'

export function RouteMiddleSplitSector({ travelTime }: RouteMiddleSectorProps) {
  return (
    <View
      style={{
        marginVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SmallDot />
        <View style={{ width: 180, height: 20 }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconDot travelTime={travelTime} />
        <SmallDot />
        <SmallDot />
        <SmallDot />
        <SmallDot />
        <SmallDot />
        <SmallDot />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 10 }} />
        <SmallDot />
        <View style={{ width: 160, height: 20 }} />
        <SmallDot />
      </View>
    </View>
  )
}
