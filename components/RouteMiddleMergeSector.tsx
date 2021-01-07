import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { RouteMiddleSectorProps } from '../types'
import { SmallDot } from './SmallDot'
import { IconDot } from './IconDot'

export function RouteMiddleMergeSector({ travelTimes }: RouteMiddleSectorProps) {
  return (
    <View
      style={{
        marginVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
      }}
    >
      <View
        key='firstRow'
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 2}} />
        <SmallDot/>
        <View style={{ width: 142, height: 20 }} />
        <SmallDot/>
      </View>
      <View
        key='secondRow'
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconDot  travelTime={travelTimes[0]} />
        <SmallDot/>
        <SmallDot/>
        <SmallDot/>
        <SmallDot/>
        <IconDot  travelTime={travelTimes[1]} />
      </View>
      <SmallDot/>
    </View>
  )
}
