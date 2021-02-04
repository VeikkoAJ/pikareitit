import { useQuery } from '@apollo/client';
import { StationsQueryData, StopsQueryData } from '../transitStopsQueryTypes';
import {
  transitStationsRequest,
  transitStopsRequest,
} from '../services/TransitStopsQuery';

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
    /** Returns all stops */
    stops: stopsData,
    /** Returns all stations */
    stations: stationsData,
  };
}
