import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { basicColors, routeLegColors } from '../styles/BasicColors'

type RouteStartEndProps = {
  name: string
  iconName: String
}

export default function RouteStartEnd({ name, iconName }: RouteStartEndProps) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: routeLegColors.light,
        borderRadius: 10,
        elevation: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: 'white',
            paddingEnd: 5,
          }}
        >
          {name}
        </Text>
        <MaterialCommunityIcons name={iconName} size={30} color="white" />
      </View>
    </View>
  )
}
