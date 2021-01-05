import { StatusBar, View } from 'react-native';
import React, { useState } from 'react';

import { RouteScreenTopBar } from '../components/RouteScreenTopBar';
import { RouteContainer } from '../components/RouteContainer';
import { basicColors } from '../styles/BasicColors';
import { Route } from '../types';

export function CurrentRouteScreen() {
  const [route, setRoute] = useState<Route>({
    routeName: 'Majurinkulma -> Lehmustie',
    description: 'there is no description to this cursed shit',
    originPlace: 'Majurinkulma',
    finalDestination: 'Lehmustie',
    startWalkDuration: 2.3 * 60,
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
            to: 'Pasilan asema, Helsinki, Helsinki::60.1986935,24.9345064',
            transportModes: [{ mode: 'RAIL' }],
          },
          {
            from: 'Leppävaaran asema, Espoo::60.2193775,24.8113851',
            to: 'Pasilan asema, Helsinki, Helsinki::60.1986935,24.9345064',
            transportModes: [{ mode: 'BUS' }],
          }
        ],
        middleSector: 'single',
        middleSectorTransportModes: [{ mode: 'RAIL' }],
      },
      {
        routeLegs: [
          {
            from: 'Pasilan asema, Helsinki::60.1986935,24.9345064',
            to: 'Pukinmäen asema, Helsinki::60.2424651,24.9917559',
            secondaryTo: 'Malmin asema, Helsinki::60.2506078,25.0094086',
            transportModes: [{ mode: 'RAIL' }],
          },
        ],
        middleSector: 'single',
        middleSectorTransportModes: [{ mode: 'RAIL' }],
      },
    ],
  });

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
        <RouteContainer currentRoute={route} />
      </View>
    </View>
  );
}
