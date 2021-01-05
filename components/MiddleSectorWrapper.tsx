import React from 'react';
import { MiddleSector } from '../types';
import RouteMiddleSector from './RouteMiddleSector';
import { RouteMiddleSplitSector } from './RouteMiddleSplitSector';
import { RouteMiddleMergeSector } from './RouteMiddleMergeSector';

type MiddleSectorWrapperProps = {
  middleSector: MiddleSector;
  routeLegDurations: number[];
};

export default function MiddleSectorWrapper({
  middleSector,
  routeLegDurations,
}: MiddleSectorWrapperProps) {
  return (
    <>
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
    </>
  );
}
