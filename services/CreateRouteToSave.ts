import { MiddleSector, RouteLegKeyPair, RouteTransportLegRow } from '../types';

const mapMiddleSector = (
  rowLength: number,
  nextRowLength?: number
): MiddleSector => {
  if (nextRowLength === undefined) {
    return rowLength > 1 ? 'merge' : 'single';
  }
  if (rowLength === 1 && nextRowLength === 1) {
    return 'single';
  }
  if (rowLength === 1 && nextRowLength > 1) {
    return 'split';
  }
  if (rowLength > 1 && nextRowLength > 1) {
    return 'two';
  }
  if (rowLength > 1 && nextRowLength === 1) {
    return 'merge';
  }
  return 'single';
};

export const formatRouteLegRows = (
  routeLegKeyPairRows: RouteLegKeyPair[][]
): RouteTransportLegRow[] =>
  routeLegKeyPairRows.map((routeLegKeyPairRow, row) => ({
    routeLegs: routeLegKeyPairRow.map((_) => _.routeLeg),
    middleSector: mapMiddleSector(
      routeLegKeyPairRow.length,
      routeLegKeyPairRows[row].length
    ),
  }));
