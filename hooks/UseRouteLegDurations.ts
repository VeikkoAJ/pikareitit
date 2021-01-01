import { useEffect, useState } from 'react';

export function UseRouteLegDurations(routeLegRowCount: number) {
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
            if (index[0] === i && index[j] === j) {
              return newDuration;
            }
            return time;
          })
        )
      );
    }
  };
  useEffect(() => console.log(routeLegDurations), [routeLegDurations]);
  return { routeLegDurations, updateRouteLegDurations };
}
