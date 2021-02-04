import { useState } from 'react';
import {
  RouteLegKeyPair,
  RouteTransportLeg,
  RouteTransportLegRow,
} from '../types';

const emptyLeg = (): RouteLegKeyPair => ({
  key: new Date().getTime().toString(),
  routeLeg: {
    from: {
      address: '',
      lat: 0,
      lon: 0,
    },
    to: {
      address: '',
      lat: 0,
      lon: 0,
    },
    transportModes: [{ mode: 'WALK' }],
  },
});
/**
 * leg with start place prefilled used when adding sequential routeLegs
 * @param address startPlace name
 */
const preFilledEmptyLeg = (address: string): RouteLegKeyPair => ({
  key: new Date().getTime().toString(),
  routeLeg: {
    from: {
      address,
      lat: 0,
      lon: 0,
    },
    to: {
      address: '',
      lat: 0,
      lon: 0,
    },
    transportModes: [{ mode: 'WALK' }],
  },
});
/**
 * Adds unique keys to loaded routeLegs
 * @param routeTransportLegRows
 */
const loadRoute = (
  routeTransportLegRows: RouteTransportLegRow[] | undefined
): RouteLegKeyPair[][] => {
  if (routeTransportLegRows !== undefined) {
    return routeTransportLegRows.map((row) =>
      row.routeLegs.map((routeLeg) => ({
        key: `${routeLeg.from.address}_${new Date().getTime().toString()}`,
        routeLeg,
      }))
    );
  }
  return [[emptyLeg()]];
};

interface SettingsIndex {
  row: number;
  column: number;
}

/**
 * Creates and manipulates routeleg rows
 * @param routeTransportLegRows loaded route
 */
export default function UseRouteCreation(
  routeTransportLegRows: RouteTransportLegRow[] | undefined
) {
  const [routeLegKeyPairRows, setRouteLegKeyPairRows] = useState<
    RouteLegKeyPair[][]
  >(loadRoute(routeTransportLegRows));
  const [settingsIndex, setSettingsIndex] = useState<SettingsIndex | undefined>(
    undefined
  );
  /** appends empty routeLeg to the array and moves the settingsIndex
   * @param nextTo decides if new leg will be added to the same or the next row
   * @param row appends the routeLeg after it. If undefined adds it to the end of the array. If earlier routeLeg exists uses it's to as the
   * new routeLegs from
   */
  const addRouteLeg = (nextTo: boolean, row?: number) => {
    if (routeLegKeyPairRows.length === 0) {
      setRouteLegKeyPairRows([...routeLegKeyPairRows, [emptyLeg()]]);
      return;
    }
    if (row === undefined) {
      const lastRow = routeLegKeyPairRows[routeLegKeyPairRows.length - 1];
      setRouteLegKeyPairRows([
        ...routeLegKeyPairRows,
        [preFilledEmptyLeg(lastRow[0].routeLeg.to.address)],
      ]);
      return;
    }
    if (settingsIndex && row < settingsIndex.row) {
      setSettingsIndex({
        row: settingsIndex.row + 1,
        column: settingsIndex.column,
      });
    }
    if (nextTo) {
      const lastRow = routeLegKeyPairRows[routeLegKeyPairRows.length - 1];
      const presetFrom = () => {
        if (lastRow[0].routeLeg.secondaryTo !== undefined) {
          return lastRow[0].routeLeg.secondaryTo.address;
        }
        if (lastRow.length > 1) {
          return lastRow[1].routeLeg.to.address;
        }
        return '';
      };
      setRouteLegKeyPairRows([
        ...routeLegKeyPairRows.slice(0, row),
        [...routeLegKeyPairRows[row], preFilledEmptyLeg(presetFrom())],
        ...routeLegKeyPairRows.slice(row + 1),
      ]);
      return;
    }
    setRouteLegKeyPairRows([
      ...routeLegKeyPairRows.slice(0, row + 1),
      [emptyLeg()],
      ...routeLegKeyPairRows.slice(row + 1),
    ]);
  };

  /** removes the routeLeg at current index and moves the settingsIndex
   * @param row location of the removable routeLeg
   * @param column location of the removable routeLeg
   */
  const removeRouteLeg = (row: number, column: number) => {
    if (settingsIndex?.row === row && settingsIndex?.column === column) {
      setSettingsIndex(undefined);
    }
    if (settingsIndex) {
      setSettingsIndex({
        row: settingsIndex.row + settingsIndex.row < row ? -1 : 0,
        column: settingsIndex.column + settingsIndex.column < column ? -1 : 0,
      });
    }
    if (routeLegKeyPairRows[row].length === 1) {
      setRouteLegKeyPairRows([
        ...routeLegKeyPairRows.slice(0, row),
        ...routeLegKeyPairRows.slice(row + 1),
      ]);
      return;
    }

    setRouteLegKeyPairRows([
      ...routeLegKeyPairRows.slice(0, row),
      [
        ...routeLegKeyPairRows[row].slice(0, column),
        ...routeLegKeyPairRows[row].slice(column + 1),
      ],
      ...routeLegKeyPairRows.slice(row + 1),
    ]);
  };

  /** moves the routeLeg at current index to the newIndex and sets the settingsIndex to newIndex
   * meaning this should be used from the components settings panel only.
   * @param row starting location of the movable routeLeg
   * @param column starting location of the movable routeLeg
   * @param newRow destination of the movable routeLeg
   * @param newColumn destination of the movable routeLeg
   */
  const moveRouteLeg = (
    row: number,
    column: number,
    newRow: number,
    newColumn: number
  ) => {
    if (row === newRow && column === newColumn) {
      return;
    }
    setSettingsIndex({ row: newRow, column: newColumn });

    const movableRouteLegRowKeyPair = routeLegKeyPairRows[row];
    const filteredRouteLegRows = routeLegKeyPairRows.filter(
      (_) => _ !== movableRouteLegRowKeyPair
    );

    setRouteLegKeyPairRows([
      ...filteredRouteLegRows.slice(0, newRow),
      movableRouteLegRowKeyPair,
      ...filteredRouteLegRows.slice(newRow),
    ]);
  };

  /** sets new parameters to routeLeg
   * @param routeLeg editable routeLeg
   * @param row position of routeLeg
   * @param column position of routeLeg
   */
  const setRouteLeg = (
    routeLeg: RouteTransportLeg,
    row: number,
    column: number
  ) => {
    // test row and column limits
    if (row >= routeLegKeyPairRows.length) {
      return;
    }
    if (column >= routeLegKeyPairRows[row].length) {
      return;
    }

    const newRouteLegRow: RouteLegKeyPair[] = [
      ...routeLegKeyPairRows[row].slice(0, column),
      { key: routeLegKeyPairRows[row][column].key, routeLeg },
      ...routeLegKeyPairRows[row].slice(column + 1),
    ];

    setRouteLegKeyPairRows([
      ...routeLegKeyPairRows.slice(0, row),
      newRouteLegRow,
      ...routeLegKeyPairRows.slice(row + 1),
    ]);
  };
  /** sets new settingsIndex
   * @param row
   * @param column
   */
  const setNewSettingsIndex = (
    toggle: boolean,
    row: number,
    column: number
  ) => {
    if (!toggle) {
      setSettingsIndex(undefined);
      return;
    }
    if (row >= routeLegKeyPairRows.length) {
      return;
    }
    if (column >= routeLegKeyPairRows[row].length) {
      return;
    }
    setSettingsIndex({ row, column });
  };

  return {
    routeLegKeyPairRows,
    settingsIndex,
    addRouteLeg,
    removeRouteLeg,
    moveRouteLeg,
    setRouteLeg,
    setNewSettingsIndex,
  };
}
