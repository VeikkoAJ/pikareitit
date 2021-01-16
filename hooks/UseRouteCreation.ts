// TODO Add initial route for editing existing routes

import { useState } from 'react';
import { RouteLegKeyPair, RouteTransportLeg } from '../types';

const emptyLeg = (): RouteLegKeyPair => {
  return {
    key: new Date().getTime().toString(),
    routeLeg: {move
      from: '',
      to: '',
      transportModes: [],
    },
  };
};
export function UseRouteCreation() {
  const [routeLegKeyPairs, setRouteLegKeyPairs] = useState<RouteLegKeyPair[]>([
    emptyLeg(),
  ]);
  const [settingsIndex, setSettingsIndex] = useState<number | undefined>(
    undefined
  );

  /** appends empty routeLeg to the array and moves the settingsIndex
   * @param index appends the routeLeg after it. If undefined adds it to the end of the array
   */
  const appendRouteLeg = (index?: number) => {
    if (!index) {
      if (settingsIndex === routeLegKeyPairs.length - 1) {
        setSettingsIndex(settingsIndex - 1);
      }
      setRouteLegKeyPairs([...routeLegKeyPairs, emptyLeg()]);
      return;
    }
    if (index === 0) {
      if (settingsIndex) {
        setSettingsIndex(settingsIndex + 1);
      }
      setRouteLegKeyPairs([emptyLeg(), ...routeLegKeyPairs]);
      return;
    }
    if (settingsIndex && index < settingsIndex) {
      setSettingsIndex(settingsIndex + 1);
    }
    setRouteLegKeyPairs([
      ...routeLegKeyPairs.slice(0, index + 1),
      emptyLeg(),
      ...routeLegKeyPairs.slice(index + 1),
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
      setRouteLegKeyPairs(routeLegKeyPairs.slice(1));
      return;
    }
    if (index === routeLegKeyPairs.length - 1) {
      if (settingsIndex === routeLegKeyPairs.length - 1) {
        setSettingsIndex(settingsIndex - 1);
      }
      setRouteLegKeyPairs(routeLegKeyPairs.slice(0, index));
      return;
    }
    if (settingsIndex === index) {
      setSettingsIndex(undefined);
    }
    if (settingsIndex && settingsIndex > index) {
      setSettingsIndex(settingsIndex - 1);
    }
    setRouteLegKeyPairs([
      ...routeLegKeyPairs.slice(0, index),
      ...routeLegKeyPairs.slice(index + 1),
    ]);
  };

  /** moves the routeLeg at current index to the newIndex and sets the settingsIndex to newIndex
   * meaning this should be used from the components settings panel only.
   * @param index starting location of the movable routeLeg
   * @param newIndex destination of the movable routeLeg
   */
  const moveRouteLeg = (index: number, newIndex: number) => {
    const movableRouteLeg = routeLegKeyPairs[index];
    const filteredRouteLegs = routeLegKeyPairs.filter(
      (_) => _ === movableRouteLeg
    );
    setSettingsIndex(newIndex);
    if (index === newIndex) {
      return;
    }
    if (newIndex === 0) {
      setRouteLegKeyPairs([movableRouteLeg, ...filteredRouteLegs]);
      return;
    }
    if (newIndex === routeLegKeyPairs.length - 1) {
      setRouteLegKeyPairs([...filteredRouteLegs, movableRouteLeg]);
      return;
    }
    setRouteLegKeyPairs([
      ...filteredRouteLegs.slice(0, newIndex),
      movableRouteLeg,
      ...filteredRouteLegs.slice(newIndex),
    ]);
  };
  // TODO name second param better
  /** sets new settingsIndex
   * @param index new settingsIndex
   * @param routeLeg editable routeleg
   */
  const setRouteLeg = (index: number, routeLeg: RouteLegKeyPair) => {
    if (index >= routeLegKeyPairs.length) {
      return;
    }
    setRouteLegKeyPairs([
      ...routeLegKeyPairs.slice(0, index),
      routeLeg,
      ...routeLegKeyPairs.slice(index + 1),
    ]);
  };

  const setNewSettingsIndex = (index?: number) => {
    if (index === undefined) {
      setSettingsIndex(undefined);
      return;
    }
    if (index >= routeLegKeyPairs.length) {
      return;
    }
    setSettingsIndex(index);
  };

  return {
    routeLegKeyPairs,
    settingsIndex,
    appendRouteLeg,
    removeRouteLeg,
    moveRouteLeg,
    setRouteLeg,
    setNewSettingsIndex,
  };
}
