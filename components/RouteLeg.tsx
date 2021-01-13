import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { RouteLegUnit } from './RouteLegUnit';
import { QueryData, RouteTransportLeg } from '../types';
import { routeLegColors } from '../styles/BasicColors';
import { routeRequest } from '../services/RouteFetcher';
import RouteLegIcon from './RouteLegIcon';
import UseRouteQuery from '../hooks/UseRouteQuery';

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
  const { mainQueryLegs, secondaryQueryLegs } = UseRouteQuery(
    routeLeg,
    startTime,
    isOld
  );

  useEffect(() => {
    if (mainQueryLegs && mainQueryLegs[0]) {
      setLegStartDate(new Date(mainQueryLegs[0]?.endTime));
      setRouteLegDuration(mainQueryLegs[0]?.duration);
    }
  }, [mainQueryLegs]);
  useEffect(() => {
    if (secondaryQueryLegs && secondaryQueryLegs[0]) {
      if (setSecLegStartDate) {
        setSecLegStartDate(new Date(secondaryQueryLegs[0]?.endTime));
      }
      if (setSecRouteLegDuration) {
        setSecRouteLegDuration(secondaryQueryLegs[0]?.duration);
      }
    }
  }, [secondaryQueryLegs]);

  const stopName = () => {
    if (mainQueryLegs && mainQueryLegs[0]) {
      return mainQueryLegs[0]?.from.name;
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
      key={routeLeg.from + ' to ' + routeLeg.to}
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
          key="stopName"
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
        {!isOld && mainQueryLegs && mainQueryLegs[0]
          ? mainQueryLegs.map((leg) => {
              if (leg !== undefined) {
                return (
                  <RouteLegUnit
                    key={`${leg.route.shortName}@${leg.from}`}
                    legUnit={{
                      name: leg.route.shortName,
                      startTime: leg.startTime,
                      endTime: leg.endTime,
                      realTime: leg.realTime,
                    }}
                    showAdditional
                  />
                );
              }
              return null;
            })
          : null}
      </View>
    </TouchableOpacity>
  );
}
