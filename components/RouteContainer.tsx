import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import RouteLeg from './RouteLeg'
import RouteStartEnd from './RouteStartEnd'
import { RouteMiddleSector } from './RouteMiddleSector'
import { Route } from '../types'
import { RouteMiddleSplitSector } from './RouteMiddleSplitSector'
import { RouteMiddleMergeSector } from './RouteMiddleMergeSector'

export type RouteContainerProps = {
  currentRoute: Route
}

export function RouteContainer({ currentRoute }: RouteContainerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  // TODO Add startTime hook and travelTime hook
  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ height: 75 }} />
      <RouteStartEnd name={currentRoute.startPlace} iconName="home" />
      <RouteMiddleSector iconName="walk" />
      {currentRoute.routeTransportLegRows.map((routeLegRow, viewIndex) => (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}
            key={viewIndex}
          >
            {routeLegRow.routeLegs.map((routeLeg, index) => (
              <RouteLeg
                key={index}
                routeLeg={routeLeg}
                startTime={new Date(2021, 0, 2, 10, 0)}
                setActive={() => setActiveIndex(viewIndex)}
                isOld={activeIndex > viewIndex}
                isActive={activeIndex === viewIndex}
              />
            ))}
          </View>
          {routeLegRow.middleSector === 'single' && (
            <RouteMiddleSector travelTime={1000 * 60 * 4} />
          )}
          {routeLegRow.middleSector === 'split' && (
            <RouteMiddleSplitSector travelTime={1000 * 60 * 4} />
          )}
          {routeLegRow.middleSector === 'merge' && (
            <RouteMiddleMergeSector travelTime={1000 * 60 * 4} />
          )}
          {routeLegRow.middleSector === 'two' && (
            <RouteMiddleSector travelTime={1000 * 60 * 4} />
          )}
        </>
      ))}
      <RouteStartEnd
        name={currentRoute.destination}
        iconName="office-building"
      />
      <View style={{ height: 50 }} />
    </ScrollView>
  )
}
