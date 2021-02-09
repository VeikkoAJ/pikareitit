import { useState } from 'react';

/**
 * Custom hook that keeps track of transit times between routes
 * @param routeLegRowCount
 * @constructor
 */

export default function UseRouteLegDurations(routeLegRowCount: number) {
  const zeroArray: number[][] = new Array(routeLegRowCount).fill(
    new Array(2).fill(0)
  );
  const [routeLegDurations, setRouteLegDurations] = useState(zeroArray);

  const updateRouteLegDurations = (
    newDuration: number,
    index: [number, number]
  ) => {
    if (routeLegDurations[index[0]][index[1]] === 0) {
      setRouteLegDurations(
        routeLegDurations.map((row, i) =>
          row.map((time, j) => {
            if (index[0] === i && index[1] === j) {
              return newDuration;
            }
            return time;
          })
        )
      );
    }
  };
  return { routeLegDurations, updateRouteLegDurations };
}
