import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useQuery } from '@apollo/client'
import { format } from 'date-fns'
import { RouteLegUnit } from './RouteLegUnit'
import { QueryData, RouteTransportLeg } from '../types'
import { routeLegColors } from '../styles/BasicColors'
import { routeRequest } from '../services/RouteFetcher'
import RouteLegIcon from './RouteLegIcon'

type RouteLegProps = {
  routeLeg: RouteTransportLeg
  startTime: Date
  setActive: () => void
  isOld: boolean
  isActive: boolean
}

export default function RouteLeg({
  routeLeg,
  startTime,
  setActive,
  isOld,
  isActive,
}: RouteLegProps) {
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery<QueryData>(routeRequest, {
    variables: {
      from: routeLeg.from,
      to: routeLeg.to,
      date: format(startTime, 'yyyy-MM-dd'),
      time: format(startTime, 'HH:mm:ss'),
    },
    skip: isOld,
  })

  if (error) {
    return error
  }

  const stopName =
    data?.plan.itineraries[0].legs[1].from.name || routeLeg.from.split(',')[0]

  function borderColor(): string {
    if (isActive) {
      return 'red' // TODO Change to a better color
    }
    if (isOld) {
      return routeLegColors.lightVisited
    }
    return routeLegColors.light
  }

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexShrink: 1,
        backgroundColor: !isOld
          ? routeLegColors.light
          : routeLegColors.lightVisited,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: borderColor(),
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 15,
        elevation: !isOld ? 1 : isActive ? 3 : 0,
      }}
      onPress={setActive}
    >
      <View
        style={{
          flexShrink: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
        }}
      >
        {stopName && (
          <Text
            style={{
              flexShrink: 1,
              color: 'white',
              fontSize: 24,
            }}
          >
            {stopName}
          </Text>
        )}
        <RouteLegIcon
          transportMode={routeLeg?.transportModes[0]}
          size={30}
          color="white"
        />
      </View>
      <View style={{ minHeight: 70 }}>
        {!isOld && data
          ? data?.plan.itineraries.map((itinerary, key) => (
              <RouteLegUnit
                key={key}
                legUnit={{
                  name: itinerary.legs[1].route.shortName,
                  startTime: itinerary.legs[1].startTime,
                  realTime: true,
                }}
              />
            ))
          : null}
      </View>
    </TouchableOpacity>
  )
}
