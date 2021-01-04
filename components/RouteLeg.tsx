import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { RouteLegUnit } from './RouteLegUnit';
import { QueryData, RouteTransportLeg } from '../types';
import { routeLegColors } from '../styles/BasicColors';
import { routeRequest } from '../services/RouteFetcher';
import RouteLegIcon from './RouteLegIcon';

interface RouteLegProps {
  routeLeg: RouteTransportLeg;
  startTime: Date | undefined;
  setLegStartDate: (date: Date) => void;
  setSecLegStartDate?: (date: Date) => void;
  setRouteStartTime: (date: Date) => void;
  setSecRouteStartTime?: (date: Date) => void;
  setRouteLegDuration: (time: number) => void;
  setSecRouteLegDuration?: (time: number) => void;
  setActive: () => void;
  isOld: boolean;
  isActive: boolean;
}

export default function RouteLeg({
  routeLeg,
  startTime,
  setLegStartDate,
  setRouteStartTime,
  setSecRouteStartTime,
  setRouteLegDuration,
  setSecRouteLegDuration,
  setActive,
  isOld,
  isActive,
}: RouteLegProps) {
  // TODO add secondary destination querys

  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery<QueryData>(routeRequest, {
    variables: {
      from: routeLeg.from,
      to: routeLeg.to,
      date: format(
        startTime !== undefined ? startTime : new Date(),
        'yyyy-MM-dd'
      ),
      time: format(
        startTime !== undefined ? startTime : new Date(),
        'HH:mm:ss'
      ),
    },
    fetchPolicy: 'network-only', // set false when testing with live dates
    skip: isOld || startTime === undefined,
  });

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (data && data?.plan.itineraries[0].legs.length > 1) {
      setLegStartDate(new Date(data?.plan.itineraries[0].legs[1].endTime));
      setRouteLegDuration(data.plan.itineraries[0].legs[1].duration);
    }
  }, [data]);

  const stopName = () => {
    if (data) {
      return data?.plan.itineraries[0].legs[1].from.name;
    }
    return routeLeg.from.split(',')[0];
  };

  const borderColor = () => {
    if (isActive) {
      return 'red'; // TODO Change to a better color
    }
    if (isOld) {
      return routeLegColors.lightVisited;
    }
    return routeLegColors.light;
  };

  const elevation = () => {
    if (isActive) {
      return 5;
    }
    if (isOld) {
      return 0;
    }
    return 1;
  };

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
        elevation: elevation(),
      }}
      onPress={() => {
        setRouteStartTime(new Date());
        setActive();
      }}
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
        <Text
          style={{
            flexShrink: 1,
            color: 'white',
            fontSize: 24,
          }}
        >
          {stopName()}
        </Text>
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
  );
}
