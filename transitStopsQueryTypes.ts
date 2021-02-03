export type Stop = {
  gtfsId: string;
  name: string;
  lat: number;
  lon: number;
};

export type StopsQueryData = {
  stops: Stop[];
};

export type Station = {
  gtfsId: string;
  name: string;
  lat: number;
  lon: number;
};

export type StationsQueryData = {
  stations: Station[];
};
