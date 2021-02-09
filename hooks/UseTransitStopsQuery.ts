import { useQuery } from '@apollo/client';
import { StationsQueryData, StopsQueryData } from '../transitStopsQueryTypes';
import {
  transitStationsRequest,
  transitStopsRequest,
} from '../services/TransitStopsQuery';

/**
 * Custom hook used to query all stops and stations in HSL public transport network
 * Uses the HSL Routing API
 */
export default function UseTransitStopsQuery() {
  const stopsQueries = () => {
    const stopsResult = useQuery<StopsQueryData>(transitStopsRequest, {
      fetchPolicy: 'cache-first',
      skip: false, // might be needed later
    });
    const stationsResult = useQuery<StationsQueryData>(transitStationsRequest, {
      fetchPolicy: 'cache-first',
      skip: false,
    });
    return [stopsResult, stationsResult];
  };

  const [
    { loading: stopsLoading, data: stopsData, error: stopsError },
    { loading: stationsLoading, data: stationsData, error: stationsError },
  ] = stopsQueries();
  return {
    /** all HSL stops */
    stops: stopsData,
    /** all HSL stations */
    stations: stationsData,
  };
}
