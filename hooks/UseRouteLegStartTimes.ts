import { useRef, useState } from 'react';
import { addMilliseconds } from 'date-fns';

// TODO move this to the user configurable settings panel
/**
 * Sets the query searchTime overlap.
 * Allows transits that leave less than minute later
 * than the predicted arrival of the earlier transit
 */
const staticTimeOffset = -1000 * 60;

/**
 * Custom hook that allows chaining querying route itineraries ny keeping track of the start times
 * @param routeLegRowCount how many rows of routeLegs the route has
 * @param initialStartTime first time to query times
 * @param initialTimeOffset how much the initialStartTime is delayed or advanced in milliseconds
 * @constructor
 */
export default function UseRouteLegStartTimes(
  routeLegRowCount: number,
  initialStartTime: Date,
  initialTimeOffset: number
) {
  const emptyArray: (Date | undefined)[][] = new Array(routeLegRowCount).fill(
    new Array(2).fill(undefined)
  );
  const initialArray: (Date | undefined)[][] = [
    [
      addMilliseconds(initialStartTime, initialTimeOffset),
      addMilliseconds(initialStartTime, initialTimeOffset),
    ],
  ];

  const [routeLegStartDates, setRouteLegStartDates] = useState(
    initialArray.concat(emptyArray.slice(0, routeLegRowCount - 1))
  );

  /**
   * Resets the start times to start from current index, startTimes before index are set undefined
   * @param newStartTime time when the first itinerary starts
   * @param timeOffset offsets the newStartTime by given milliseconds
   * @param location location where the new startTime is set
   */
  const updateStartTime = (
    newStartTime: Date,
    timeOffset: number,
    location: {
      row: number;
      column: number;
    }
  ) => {
    const temp = emptyArray.map((startTimeRow, row) =>
      startTimeRow.map((startTime, column) => {
        if (location.row === row && location.column === column) {
          return addMilliseconds(newStartTime, timeOffset);
        }
        return startTime;
      })
    );
    setRouteLegStartDates(temp);
  };
  /**
   * Updates the following
   * @param newStartTime start time of the itinerary
   * @param location where the new start time should be set
   */
  const updateNextRouteLegStartTime = (
    newStartTime: Date,
    location: {
      row: number;
      column: number;
    }
  ) => {
    if (
      location.row < routeLegRowCount &&
      routeLegStartDates[location.row][location.column] === undefined
    ) {
      setRouteLegStartDates(
        routeLegStartDates.map((row, i) =>
          row.map((startTime, j) => {
            if (location.row === i && location.column === j) {
              return new Date(newStartTime.getTime() + staticTimeOffset);
            }
            return startTime;
          })
        )
      );
    }
  };

  return { routeLegStartDates, updateNextRouteLegStartTime, updateStartTime };
}
