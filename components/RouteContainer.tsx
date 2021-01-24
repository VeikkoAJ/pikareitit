import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import RouteLeg from './RouteLeg';
import RouteStartEnd from './RouteStartEndLeg';
import RouteMiddleSector from './RouteMiddleSector';
import { Route } from '../types';
import { UseRouteLegDurations } from '../hooks/UseRouteLegDurations';
import UseRouteLegStartTimes from '../hooks/UseRouteLegStartTimes';
import MiddleSectorWrapper from './MiddleSectorWrapper';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

export type RouteContainerProps = {
  currentRoute: Route;
  timeOffset: number;
};

export function RouteContainer({
  currentRoute,
  timeOffset,
}: RouteContainerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [infoIndex, setInfoIndex] = useState<undefined | number>(undefined);
  const {
    routeLegStartDates,
    updateNextRouteLegStartTime,
    updateStartTime,
  } = UseRouteLegStartTimes(
    currentRoute.routeTransportLegRows.length,
    new Date(),
    timeOffset
  );
  const { routeLegDurations, updateRouteLegDurations } = UseRouteLegDurations(
    currentRoute.routeTransportLegRows.length
  );
  useEffect(() => {
    updateStartTime(new Date(), timeOffset, { row: 0, column: 0 });
  }, [timeOffset]);

  return (
    <ScrollView style={currentRouteStyles.scrollView}>
      <RouteStartEnd headerText={currentRoute.originPlace} iconName="home" />
      <RouteMiddleSector travelTimes={[currentRoute.startWalkDuration]} />
      {currentRoute.routeTransportLegRows.map((routeLegRow, row) => (
        <>
          <View
            style={currentRouteStyles.row}
            key={`${routeLegRow.routeLegs[0].from.address} to ${routeLegRow.routeLegs[0].to.address} row`}
          >
            {routeLegRow.routeLegs.map((routeLeg, column) => (
              <React.Fragment
                key={`${routeLeg.from.address} to ${routeLeg.to.address} fragment`}
              >
                <RouteLeg
                  key={`${routeLeg.from.address} to ${routeLeg.to.address}`}
                  routeLeg={routeLeg}
                  startTime={routeLegStartDates[row][column]}
                  updateNextRouteLegStartTime={(date: Date) =>
                    updateNextRouteLegStartTime(date, {
                      row: row + 1,
                      column,
                    })
                  }
                  updateSecNextRouteLegStartTime={(date: Date) =>
                    updateNextRouteLegStartTime(date, {
                      row: row + 1,
                      column: column + 1,
                    })
                  }
                  setRouteStartTime={() =>
                    updateStartTime(new Date(), timeOffset, { row, column })
                  }
                  setRouteLegDuration={(time: number) =>
                    updateRouteLegDurations(time, [row, column])
                  }
                  setSecRouteLegDuration={(time: number) =>
                    updateRouteLegDurations(time, [row, column + 1])
                  }
                  setActive={() => {
                    if (infoIndex !== row) {
                      setInfoIndex(undefined);
                    }
                    setActiveIndex(row);
                  }}
                  setInfo={() => setInfoIndex(row)}
                  hideInfo={() => setInfoIndex(undefined)}
                  showInfo={infoIndex === row}
                  isOld={activeIndex > row}
                  isActive={activeIndex <= row}
                />
                <View
                  key={`${routeLeg.from.address} to ${routeLeg.to.address} splitter`}
                  style={{ width: '1%' }}
                />
              </React.Fragment>
            ))}
          </View>
          <MiddleSectorWrapper
            middleSector={routeLegRow.middleSector}
            routeLegDurations={routeLegDurations[row]}
          />
        </>
      ))}
      <RouteStartEnd
        headerText={currentRoute.finalDestination}
        iconName="office-building"
      />
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
