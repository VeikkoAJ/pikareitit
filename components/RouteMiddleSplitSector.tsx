import React from 'react'
import { View } from 'react-native'
import { RouteMiddleSectorProps } from '../types'
import { SmallDot } from './SmallDot'
import { IconDot } from './IconDot'

export function RouteMiddleSplitSector({ travelTimes }: RouteMiddleSectorProps) {
  return (
    <View
      style={{
        marginVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
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
        <SmallDot />
        <View style={{ width: 170, height: 20 }} />
      </View>
      <View
        key='secondRow'
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconDot travelTime={travelTimes[0]}/>
        <SmallDot />
        <SmallDot />
        <SmallDot />
        <SmallDot />
        <IconDot travelTime={travelTimes[1] - travelTimes[0]} showSign={'+'} />
      </View>
      <View
        key='thirdRow'
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 2}} />
        <SmallDot />
        <View style={{ width: 142, height: 20 }} />
        <SmallDot />
      </View>
    </View>
  )
}
