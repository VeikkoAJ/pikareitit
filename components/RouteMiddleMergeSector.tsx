import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { RouteMiddleSectorProps } from '../types'
import { SmallDot } from './SmallDot'
import { IconDot } from './IconDot'

export function RouteMiddleMergeSector({ iconName }: RouteMiddleSectorProps) {
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
        <View style={{ width: 170, height: 20 }} />
        <SmallDot />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SmallDot />
        <SmallDot />
        <SmallDot />
        <IconDot name={iconName} />
        <SmallDot />
        <SmallDot />
        <SmallDot />
      </View>
      <SmallDot />
    </View>
  )
}
