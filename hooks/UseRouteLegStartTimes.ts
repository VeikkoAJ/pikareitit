import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function UseRouteLegStartTimes(
  routeLegRowCount: number,
  initialStartTime: Date = new Date()
) {
  const emptyArray: (Date | undefined)[][] = new Array(routeLegRowCount).fill(
    new Array(2).fill(undefined)
  );
  const initialArray: (Date | undefined)[][] = [
    [initialStartTime, initialStartTime],
  ];

  const [routeLegStartDates, setRouteLegStartDates] = useState(
    initialArray.concat(emptyArray.slice(0, routeLegRowCount - 1))
  );

  const updateNextRouteLegStartTime = (
    newStartTime: Date,
    index: [number, number]
  ) => {
    if (
      index[0] < routeLegRowCount &&
      routeLegStartDates[index[0]][index[1]] === undefined
    ) {
      setRouteLegStartDates(
        routeLegStartDates.map((row, i) =>
          row.map((date, j) => {
            if (index[0] === i && index[1] === j) {
              return newStartTime;
            }
            return date;
          })
        )
      );
    }
  };

  const updateStartTime = (
    newStartTime: Date,
    startRouteLegIndex: [number, number]
  ) => {
    const temp = emptyArray.map((row, i) =>
      row.map((date, j) => {
        if (startRouteLegIndex[0] === i && startRouteLegIndex[1] === j) {
          return newStartTime;
        }
        return date;
      })
    );
    setRouteLegStartDates(temp);
  };
  return { routeLegStartDates, updateNextRouteLegStartTime, updateStartTime };
}
