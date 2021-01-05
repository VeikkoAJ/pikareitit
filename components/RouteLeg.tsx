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
  setRouteStartTime: () => void;
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
  setSecLegStartDate,
  setRouteStartTime,
  setRouteLegDuration,
  setSecRouteLegDuration,
  setActive,
  isOld,
  isActive,
}: RouteLegProps) {
  // TODO add secondary destination querys

  const routeQueries = () => {
    const mainResult = useQuery<QueryData>(routeRequest, {
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
    fetchPolicy: 'cache-first',
    skip: isOld || startTime === undefined,
  });
    const secondaryResult = useQuery<QueryData>(routeRequest, {
      variables: {
        from: routeLeg.from,
        to: routeLeg.secondaryTo,
        date: format(
          startTime !== undefined ? startTime : new Date(),
          'yyyy-MM-dd'
        ),
        time: format(
          startTime !== undefined ? startTime : new Date(),
          'HH:mm:ss'
        ),
      },
      fetchPolicy: 'cache-first',
      skip: routeLeg.secondaryTo === undefined || isOld || startTime === undefined,
    });
    return [mainResult, secondaryResult]
  }

  const [
    { loading: loading1, data: data1},
    { loading: loading2, data: data2}
  ] = routeQueries()

  useEffect(() => {
    if (data1 && data1?.plan.itineraries[0] !== undefined) {
      setLegStartDate(new Date(data1?.plan.itineraries[0].legs[1].endTime));
      setRouteLegDuration(data1.plan.itineraries[0].legs[1].duration);
    }

  }, [data1]);
  useEffect( () => {
    if (data2 && data2.plan.itineraries[0] !== undefined) {
      if (setSecLegStartDate) {
        setSecLegStartDate(new Date(data2.plan.itineraries[0].legs[1].endTime));
      }
      if (setSecRouteLegDuration) {
        setSecRouteLegDuration(data2.plan.itineraries[0].legs[1].duration)
      }
    }
  }, [data2])

  const stopName = () => {
    if (data1 && data1?.plan.itineraries[0]  !== undefined) {
      return data1?.plan.itineraries[0].legs[1].from.name;
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
        setRouteStartTime();
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
          numberOfLines={1}
          ellipsizeMode="tail"
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
        {!isOld && data1
          ? data1?.plan.itineraries.map((itinerary, key) => (
              <RouteLegUnit
                key={key}
                legUnit={{
                  name: itinerary.legs[1].route.shortName,
                  startTime: itinerary.legs[1].startTime,
                  endTime: itinerary.legs[1].endTime,
                  realTime: itinerary.legs[1].realTime
                }}
              />
            ))
          : null}
      </View>
    </TouchableOpacity>
  );
}
