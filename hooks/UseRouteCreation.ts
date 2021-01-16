// TODO Add initial route for editing existing routes

import { useState } from 'react';
import { RouteLegKeyPair, RouteTransportLeg } from '../types';

const emptyLeg = (): RouteLegKeyPair => ({
  key: new Date().getTime().toString(),
  routeLeg: {
    from: '',
    to: '',
    transportModes: [],
  },
});

interface SettingsIndex {
  row: number;
  column: number;
}

export function UseRouteCreation() {
  const [routeLegKeyPairRows, setRouteLegKeyPairRows] = useState<
    RouteLegKeyPair[][]
  >([[emptyLeg()]]);
  const [settingsIndex, setSettingsIndex] = useState<SettingsIndex | undefined>(
    undefined
  );

  /** appends empty routeLeg to the array and moves the settingsIndex
   * @param nextTo decides if new leg will be added to the same or the next row
   * @param row appends the routeLeg after it. If undefined adds it to the end of the array
   */
  const addRouteLeg = (nextTo: boolean, row?: number) => {
    if (row === undefined) {
      setRouteLegKeyPairRows([...routeLegKeyPairRows, [emptyLeg()]]);
      return;
    }
    if (settingsIndex && row < settingsIndex.row) {
      setSettingsIndex({
        row: settingsIndex.row + 1,
        column: settingsIndex.column,
      });
    }
    if (nextTo) {
      setRouteLegKeyPairRows([
        ...routeLegKeyPairRows.slice(0, row),
        [...routeLegKeyPairRows[row], emptyLeg()],
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
  const setNewSettingsIndex = (row?: number, column?: number) => {
    if (row === undefined || column === undefined) {
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
