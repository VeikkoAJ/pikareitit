// TODO Add initial route for editing existing routes

import { useState } from 'react';
import { RouteTransportLeg } from '../types';

const emptyLeg: RouteTransportLeg = {
  from: '',
  to: '',
  transportModes: [],
};

export function UseRouteCreation() {
  const [routeLegs, setRouteLegs] = useState<RouteTransportLeg[]>([emptyLeg]);
  const [settingsIndex, setSettingsIndex] = useState<number | undefined>(
    undefined
  );

  /** appends empty routeLeg to the array and moves the settingsIndex
   * @param index appends the routeLeg after it. If undefined adds it to the end of the array
   */
  const appendRouteLeg = (index?: number) => {
    if (!index) {
      if (settingsIndex === routeLegs.length - 1) {
        setSettingsIndex(settingsIndex - 1);
      }
      setRouteLegs([...routeLegs, emptyLeg]);
      return;
    }
    if (index === 0) {
      if (settingsIndex) {
        setSettingsIndex(settingsIndex + 1);
      }
      setRouteLegs([emptyLeg, ...routeLegs]);
      return;
    }
    if (settingsIndex && index < settingsIndex) {
      setSettingsIndex(settingsIndex + 1);
    }
    setRouteLegs([
      ...routeLegs.slice(0, index + 1),
      emptyLeg,
      ...routeLegs.slice(index + 1),
    ]);
  };

  /** removes the routeLeg at current index and moves the settingsIndex
   * @param index location of the removable routeLeg
   */
  const removeRouteLeg = (index: number) => {
    if (index === 0) {
      if (settingsIndex) {
        setSettingsIndex(settingsIndex - 1);
      }
      setRouteLegs(routeLegs.slice(1));
      return;
    }
    if (index === routeLegs.length - 1) {
      if (settingsIndex === routeLegs.length - 1) {
        setSettingsIndex(settingsIndex - 1);
      }
      setRouteLegs(routeLegs.slice(0, index));
      return;
    }
    if (settingsIndex === index) {
      setSettingsIndex(undefined);
    }
    if (settingsIndex && settingsIndex > index) {
      setSettingsIndex(settingsIndex - 1);
    }
    setRouteLegs([...routeLegs.slice(0, index), ...routeLegs.slice(index + 1)]);
  };
  /** moves the routeLeg at current index to the newIndex and sets the settingsIndex to newIndex
   * meaning this should be used from the components settings panel only.
   * @param index starting location of the movable routeLeg
   * @param newIndex destination of the movable routeLeg
   */
  const moveRouteLeg = (index: number, newIndex: number) => {
    const movableRouteLeg = routeLegs[index];
    const filteredRouteLegs = routeLegs.filter((_) => _ === movableRouteLeg);
    setSettingsIndex(newIndex);
    if (index === newIndex) {
      return;
    }
    if (newIndex === 0) {
      setRouteLegs([movableRouteLeg, ...filteredRouteLegs]);
      return;
    }
    if (newIndex === routeLegs.length - 1) {
      setRouteLegs([...filteredRouteLegs, movableRouteLeg]);
      return;
    }
    setRouteLegs([
      ...filteredRouteLegs.slice(0, newIndex),
      movableRouteLeg,
      ...filteredRouteLegs.slice(newIndex),
    ]);
  };
  /** sets new settingsIndex
   * @param index new settingsIndex
   */
  const changeSettingsIndex = (index?: number) => {
    if (index === undefined) {
      setSettingsIndex(undefined);
      return;
    }
    if (index >= routeLegs.length) {
      return;
    }
    setSettingsIndex(index);
  };

  return {
    routeLegs,
    settingsIndex,
    appendRouteLeg,
    removeRouteLeg,
    moveRouteLeg,
    changeSettingsIndex,
  };
}
