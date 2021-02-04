import React from 'react';
import { MiddleSector } from '../types';
import RouteMiddleSector from './RouteMiddleSector';
import RouteMiddleSplitSector from './RouteMiddleSplitSector';
import RouteMiddleMergeSector from './RouteMiddleMergeSector';
import { isOldContext } from '../contextTypes';

type MiddleSectorWrapperProps = {
  middleSector: MiddleSector;
  routeLegDurations: number[];
  isOld: boolean;
};

export default function MiddleSectorWrapper({
  middleSector,
  routeLegDurations,
  isOld,
}: MiddleSectorWrapperProps) {
  return (
    <isOldContext.Provider value={isOld}>
      {middleSector === 'single' && (
        <RouteMiddleSector travelTimes={routeLegDurations} />
      )}
      {middleSector === 'split' && (
        <RouteMiddleSplitSector travelTimes={routeLegDurations} />
      )}
      {middleSector === 'merge' && (
        <RouteMiddleMergeSector travelTimes={routeLegDurations} />
      )}
      {middleSector === 'two' && (
        <RouteMiddleSector travelTimes={routeLegDurations} />
      )}
    </isOldContext.Provider>
  );
}
