import React, { useEffect, useRef, useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import RouteLegUnit from './RouteLegUnit';
import { RouteTransportLeg } from '../types';
import UseRouteQuery from '../hooks/UseRouteQuery';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';
import { MapSecondaryDestinationTimes } from '../services/MapSecondayDestinationTimes';
import { Leg } from '../routeQueryTypes';

const _ = require('lodash');

interface RouteLegProps {
  routeLeg: RouteTransportLeg;
  startTime: Date | undefined;
  updateNextRouteLegStartTime: (date: Date) => void;
  updateSecNextRouteLegStartTime: (date: Date) => void;
  setRouteStartTime: () => void;
  setRouteLegDuration: (time: number) => void;
  setSecRouteLegDuration: (time: number) => void;
  setActive: () => void;
  setInfo: () => void;
  hideInfo: () => void;
  isOld: boolean;
  isActive: boolean;
  showInfo: boolean;
}

export default function RouteLeg({
  routeLeg,
  startTime,
  updateNextRouteLegStartTime,
  updateSecNextRouteLegStartTime,
  setRouteStartTime,
  setRouteLegDuration,
  setSecRouteLegDuration,
  setActive,
  setInfo,
  hideInfo,
  isOld,
  isActive,
  showInfo,
}: RouteLegProps) {
  const [changeStartTime, setChangeStartTime] = useState(false);
  const { mainQueryLegs, secondaryQueryLegs } = UseRouteQuery(
    routeLeg,
    startTime,
    isOld
  );

  useEffect(() => {
    if (mainQueryLegs && mainQueryLegs[0]) {
      updateNextRouteLegStartTime(new Date(mainQueryLegs[0]?.endTime));
      setRouteLegDuration(mainQueryLegs[0]?.duration);
    }
  }, [mainQueryLegs]);
  useEffect(() => {
    if (secondaryQueryLegs && secondaryQueryLegs[0]) {
      updateSecNextRouteLegStartTime(new Date(secondaryQueryLegs[0]?.endTime));
      setSecRouteLegDuration(secondaryQueryLegs[0]?.duration);
    }
  }, [secondaryQueryLegs]);

  const change = () => {
    setRouteStartTime();
    setActive();
  };

  const debounced = useRef(
    _.debounce(() => {
      setChangeStartTime(false);
    }, 3000)
  );

  useEffect(() => {
    if (changeStartTime) {
      change();
      debounced.current();
    }
  }, [changeStartTime]);

  const key = `${routeLeg.from.address} to ${routeLeg.to.address}`;

  const stopName = () => {
    if (mainQueryLegs && mainQueryLegs[0]) {
      return mainQueryLegs[0]?.from.name.split(',')[0];
    }
    return routeLeg.from.address.split(',')[0];
  };

  const platFormCode = (leg: Leg) => {
    if (leg.mode !== 'RAIL') {
      return undefined;
    }
    if (leg.from.stop === null || leg.from.stop.platformCode === null) {
      return undefined;
    }
    return leg.from.stop.platformCode;
  };

  const style = () => {
    if (isActive) {
      return currentRouteStyles.legActiveModifier;
    }
    if (isOld) {
      return currentRouteStyles.legDisabledModifier;
    }
    return undefined;
  };
  return (
    <TouchableOpacity
      key={`${key} touchableOpacity`}
      style={[currentRouteStyles.legPressable, style()]}
      onPress={() => (showInfo ? hideInfo() : setInfo())}
      onLongPress={() => {
        if (changeStartTime) {
          ToastAndroid.show(
            'you must wait some time before updating',
            ToastAndroid.LONG
          );
        }
        if (!changeStartTime) {
          setChangeStartTime(true);
        }
      }}
    >
      <View key={`${key}headerView`} style={currentRouteStyles.legHeaderRow}>
        <Text
          key={`${key} header`}
          style={currentRouteStyles.headerText}
          numberOfLines={2}
          ellipsizeMode="tail"
          textBreakStrategy="balanced"
        >
          {stopName()}
        </Text>
      </View>
      <View key={`${key}contentView`} style={{ minHeight: 70 }}>
        {!isOld && mainQueryLegs
          ? MapSecondaryDestinationTimes(mainQueryLegs, secondaryQueryLegs).map(
              (leg) => {
                if (leg !== undefined) {
                  return (
                    <RouteLegUnit
                      key={`${leg.mainQueryLeg.route.shortName}from${leg.mainQueryLeg.from.name}@${leg.mainQueryLeg.startTime}`}
                      legUnit={{
                        name: leg.mainQueryLeg.route.shortName,
                        platformCode: platFormCode(leg.mainQueryLeg),
                        startTime: leg.mainQueryLeg.startTime,
                        endTime: leg.mainQueryLeg.endTime,
                        realTime: leg.mainQueryLeg.realTime,
                        secondaryEndTime: leg.secondaryLegEndTime,
                      }}
                      showAdditional={showInfo}
                    />
                  );
                }
                return null;
              }
            )
          : null}
      </View>
    </TouchableOpacity>
  );
}
