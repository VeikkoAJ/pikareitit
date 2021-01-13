import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import RouteLeg from './RouteLeg';
import RouteStartEnd from './RouteStartEnd';
import RouteMiddleSector from './RouteMiddleSector';
import { Route } from '../types';
import { UseRouteLegDurations } from '../hooks/UseRouteLegDurations';
import UseRouteLegStartTimes from '../hooks/UseRouteLegStartTimes';
import MiddleSectorWrapper from './MiddleSectorWrapper';

export type RouteContainerProps = {
  currentRoute: Route;
  searchTime: Date;
};

export function RouteContainer({
  currentRoute,
  searchTime,
}: RouteContainerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // TODO Add startTime hook and travelTime hook
  const {
    routeLegStartDates,
    updateNextRouteLegStartTime,
    updateStartTime,
  } = UseRouteLegStartTimes(
    currentRoute.routeTransportLegRows.length,
    searchTime
  );
  const { routeLegDurations, updateRouteLegDurations } = UseRouteLegDurations(
    currentRoute.routeTransportLegRows.length
  );
  console.log('searchTime', routeLegStartDates[0][0]);
  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ height: 75 }} />
      <RouteStartEnd name={currentRoute.originPlace} iconName="home" />
      <RouteMiddleSector travelTimes={[currentRoute.startWalkDuration]} />
      {currentRoute.routeTransportLegRows.map((routeLegRow, rowIndex) => (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}
            key={`${routeLegRow.routeLegs[0].from} to ${routeLegRow.routeLegs[0].to} row`}
          >
            {routeLegRow.routeLegs.map((routeLeg, index) => (
              <React.Fragment
                key={`${routeLeg.from} to ${routeLeg.to} fragment`}
              >
                <RouteLeg
                  key={`${routeLeg.from} to ${routeLeg.to}`}
                  routeLeg={routeLeg}
                  startTime={routeLegStartDates[rowIndex][index]}
                  setLegStartDate={(date: Date) =>
                    updateNextRouteLegStartTime(date, [rowIndex + 1, index])
                  }
                  setSecLegStartDate={(date: Date) =>
                    updateNextRouteLegStartTime(date, [rowIndex + 1, index + 1])
                  }
                  setRouteStartTime={() =>
                    updateStartTime(new Date(), [rowIndex, index])
                  }
                  setRouteLegDuration={(time: number) =>
                    updateRouteLegDurations(time, [rowIndex, index])
                  }
                  setSecRouteLegDuration={(time: number) =>
                    updateRouteLegDurations(time, [rowIndex, index + 1])
                  }
                  setActive={() => setActiveIndex(rowIndex)}
                  isOld={activeIndex > rowIndex}
                  isActive={activeIndex === rowIndex}
                />
                <View
                  key={`${routeLeg.from} to ${routeLeg.to} splitter`}
                  style={{ width: '1%' }}
                />
              </React.Fragment>
            ))}
          </View>
          <MiddleSectorWrapper
            middleSector={routeLegRow.middleSector}
            routeLegDurations={routeLegDurations[rowIndex]}
          />
        </>
      ))}
      <RouteStartEnd
        name={currentRoute.finalDestination}
        iconName="office-building"
      />
      <View style={{ height: 56 }} />
    </ScrollView>
  );
}
