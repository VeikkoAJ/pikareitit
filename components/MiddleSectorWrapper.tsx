import React from 'react';
import { MiddleSector } from '../types';
import RouteMiddleSector from './RouteMiddleSector';
import { RouteMiddleSplitSector } from './RouteMiddleSplitSector';
import { RouteMiddleMergeSector } from './RouteMiddleMergeSector';

type MiddleSectorWrapperProps = {
  middleSector: MiddleSector;
  routeLegDurations: [number, number];
};

export default function MiddleSectorWrapper({
  middleSector,
  routeLegDurations,
}: MiddleSectorWrapperProps) {
  return (
    <>
      {middleSector === 'single' && (
        <RouteMiddleSector travelTime={routeLegDurations[0]} />
      )}
      {middleSector === 'split' && (
        <RouteMiddleSplitSector travelTime={routeLegDurations[0]} />
      )}
      {middleSector === 'merge' && (
        <RouteMiddleMergeSector travelTime={routeLegDurations[0]} />
      )}
      {middleSector === 'two' && (
        <RouteMiddleSector travelTime={routeLegDurations[0]} />
      )}
    </>
  );
}
