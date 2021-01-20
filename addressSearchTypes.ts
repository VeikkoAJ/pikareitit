export type Feature = {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    country: string;
    /** city */
    locality: string;
    neighbourhood: string;
    /** A human-friendly representation of the location */
    label: string;
    address: string;
    layer: string;
    id: string;
  };
};

export type AddressSearchResponse = {
  bbox: number[];
  features: Feature[];
  geocoding: {
    attribution: string;
    engine: Record<string, unknown>;
  };
};
