import { StatusBar, Text, View } from 'react-native'
import React, { useState } from 'react'

import { RouteScreenTopBar } from '../components/RouteScreenTopBar'
import { RouteContainer } from '../components/RouteContainer'
import { basicColors } from '../styles/BasicColors'
import { Route } from '../types'

export function CurrentRouteScreen() {
  const currentTime = new Date(2021, 0, 2, 10, 0)
  const [route, setRoute] = useState<Route>({
    routeName: 'Majurinkulma -> Lehmustie',
    description: 'there is no description to this cursed shit',
    startPlace: 'Majurinkulma',
    destination: 'Lehmustie',
    routeTransportLegRows: [
      {
        routeLegs: [
          {
            from: 'Majurinkulma 2, Espoo::60.2112299,24.8230712',
            to: 'Leppävaaran asema, Espoo::60.2193775,24.8113851',
            transportModes: [{ mode: 'BUS' }, { mode: 'WALK' }],
          },
        ],
        middleSector: 'single',
        middleSectorTransportModes: [{ mode: 'BUS' }],
      },
      {
        routeLegs: [
          {
            from: 'Leppävaaran asema, Espoo::60.2193775,24.8113851',
            to: 'Pasilan Asema, Helsinki::60.1986935,24.9345064',
            transportModes: [{ mode: 'RAIL' }],
          },
        ],
        middleSector: 'split',
        middleSectorTransportModes: [{ mode: 'RAIL' }],
      },
    ],
  })

  return (
    <View
      style={{
        backgroundColor: basicColors.topBarLight,
        flex: 1,
      }}
    >
      <View
        style={{
          height: StatusBar.currentHeight,
          backgroundColor: 'black',
        }}
      />
      <View style={{ flex: 1 }}>
        <RouteScreenTopBar />
        <RouteContainer currentRoute={route} currentTime={currentTime} />
      </View>
    </View>
  )
}
