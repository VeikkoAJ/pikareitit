import { Station, Stop } from '../transitStopsQueryTypes';

/**
 * Filters the stations by given search word
 * @param stations list of all stations
 * @param search search word
 */
export const FindStation = (stations: Station[], search: string): Station[] =>
  stations.filter((station) => station.name.includes(search)).slice(0, 3);

const distance = (stop: Stop, lat: number, lon: number) => {
  const latSquare = (stop.lat - lat) * (stop.lat - lat);
  const lonSquare = (stop.lon - lon) * (stop.lon - lon);
  return Math.sqrt(latSquare + lonSquare);
};

export const FindNearestStops = (
  stops: Stop[],
  lat: number,
  lon: number
): Stop[] => {
  const filteredStops = [...stops]
    .sort(
      (stopA: Stop, stopB: Stop) =>
        distance(stopA, lat, lon) - distance(stopB, lat, lon)
    )
    .slice(0, 5);
  return filteredStops;
};
