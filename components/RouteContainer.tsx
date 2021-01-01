import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import RouteLeg from './RouteLeg';
import RouteStartEnd from './RouteStartEnd';
import RouteMiddleSector from './RouteMiddleSector';
import { Route } from '../types';
import { RouteMiddleSplitSector } from './RouteMiddleSplitSector';
import { RouteMiddleMergeSector } from './RouteMiddleMergeSector';
import { UseRouteLegDurations } from '../hooks/UseRouteLegDurations';
import UseRouteLegStartTimes from '../hooks/UseRouteLegStartTimes';

export type RouteContainerProps = {
  currentRoute: Route;
};

const placeholderDate = new Date(2021, 0, 2, 10, 0);

export function RouteContainer({ currentRoute }: RouteContainerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // TODO Add startTime hook and travelTime hook
  const {
    routeLegStartDates,
    updateRouteLegStartTime,
    updateStartTime,
  } = UseRouteLegStartTimes(
    currentRoute.routeTransportLegRows.length,
    placeholderDate
  );
  const { routeLegDurations, updateRouteLegDurations } = UseRouteLegDurations(
    currentRoute.routeTransportLegRows.length
  );

  // TODO create MiddleSector container
  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ height: 75 }} />
      <RouteStartEnd name={currentRoute.startPlace} iconName="home" />
      <RouteMiddleSector travelTime={1000 * 60 * 2.5} />
      {currentRoute.routeTransportLegRows.map((routeLegRow, rowIndex) => (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}
            key={rowIndex}
          >
            {routeLegRow.routeLegs.map((routeLeg, index) => (
              <RouteLeg
                key={index}
                routeLeg={routeLeg}
                startTime={routeLegStartDates[rowIndex][index]}
                setLegStartDate={(date: Date) =>
                  updateRouteLegStartTime(date, [rowIndex + 1, index])
                }
                setRouteStartTime={() =>
                  updateStartTime(placeholderDate, [rowIndex, index])
                }
                setRouteLegDuration={(time: number) =>
                  updateRouteLegDurations(time, [rowIndex, index])
                }
                setActive={() => setActiveIndex(rowIndex)}
                isOld={activeIndex > rowIndex}
                isActive={activeIndex === rowIndex}
              />
            ))}
          </View>
          {routeLegRow.middleSector === 'single' && (
            <RouteMiddleSector travelTime={routeLegDurations[rowIndex][0]} />
          )}
          {routeLegRow.middleSector === 'split' && (
            <RouteMiddleSplitSector
              travelTime={routeLegDurations[rowIndex][0]}
            />
          )}
          {routeLegRow.middleSector === 'merge' && (
            <RouteMiddleMergeSector
              travelTime={routeLegDurations[rowIndex][0]}
            />
          )}
          {routeLegRow.middleSector === 'two' && (
            <RouteMiddleSector travelTime={routeLegDurations[rowIndex][0]} />
          )}
        </>
      ))}
      <RouteStartEnd
        name={currentRoute.destination}
        iconName="office-building"
      />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
