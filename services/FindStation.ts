import { Station, Stop } from '../transitStopsQueryTypes';

/**
 * Filters the stations by given searchWord word. return 4 nearest stops
 * @param stations list of all stations
 * @param searchWord
 */
export const FindStation = (
  stations: Station[],
  searchWord: string
): Station[] =>
  stations
    .filter((station) => station.name.toLowerCase().includes(searchWord))
    .slice(0, 5);

const distance = (stop: Stop, lat: number, lon: number) => {
  const latSquare = (stop.lat - lat) * (stop.lat - lat);
  const lonSquare = (stop.lon - lon) * (stop.lon - lon);
  return Math.sqrt(latSquare + lonSquare);
};

/**
 * Sorts the stops by closest to th given point. returns 4 nearest stops
 * @param stops list of all stops
 * @param lat latitude of the point
 * @param lon longitude of the point
 */
export const FindNearestStops = (
  stops: Stop[],
  lat: number,
  lon: number
): Stop[] =>
  [...stops]
    .sort(
      (stopA: Stop, stopB: Stop) =>
        distance(stopA, lat, lon) - distance(stopB, lat, lon)
    )
    .slice(0, 5);
