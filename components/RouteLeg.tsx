import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { RouteLegUnit } from './RouteLegUnit';
import { QueryData, RouteTransportLeg } from '../types';
import { routeLegColors } from '../styles/BasicColors';
import { routeRequest } from '../services/RouteFetcher';
import TransportModeIcon from './TransportModeIcon';
import UseRouteQuery from '../hooks/UseRouteQuery';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

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

  const style = () => {
    if (isActive) {
      return currentRouteStyles.legActiveModifier;
    }
    if (isOld) {
      return currentRouteStyles.legOldModifier;
    }
    return undefined;
  };

  return (
    <TouchableOpacity
      key={`${routeLeg.from} to ${routeLeg.to}`}
      style={[currentRouteStyles.legPressable, style()]}
      onPress={() => {
        setRouteStartTime();
        setActive();
      }}
    >
      <View style={currentRouteStyles.legHeaderRow}>
        <Text
          key="stopName"
          style={currentRouteStyles.headerText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {stopName()}
        </Text>
        <TransportModeIcon
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
