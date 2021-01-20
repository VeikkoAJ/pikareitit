import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { RouteTransportLeg } from '../types';
import { routeRequest } from '../services/RouteFetcher';
import { QueryData } from '../routeQueryTypes';

export default function UseRouteLegStartTimes(
  routeLeg: RouteTransportLeg,
  startTime: Date | undefined,
  isOld: boolean
) {
  const routeQueries = () => {
    const mainResult = useQuery<QueryData>(routeRequest, {
      variables: {
        from: routeLeg.from,
        to: routeLeg.to,
        date: format(
          startTime !== undefined ? startTime : new Date(),
          'yyyy-MM-dd'
        ),
        time: format(
          startTime !== undefined ? startTime : new Date(),
          'HH:mm:ss'
        ),
      },
      fetchPolicy: 'cache-first',
      skip: isOld || startTime === undefined,
    });
    const secondaryResult = useQuery<QueryData>(routeRequest, {
      variables: {
        from: routeLeg.from,
        to: routeLeg.secondaryTo,
        date: format(
          startTime !== undefined ? startTime : new Date(),
          'yyyy-MM-dd'
        ),
        time: format(
          startTime !== undefined ? startTime : new Date(),
          'HH:mm:ss'
        ),
      },
      fetchPolicy: 'cache-first',
      skip:
        routeLeg.secondaryTo === undefined || isOld || startTime === undefined,
    });
    return [mainResult, secondaryResult];
  };

  const [
    { loading: loading1, data: data1, error: error1 },
    { loading: loading2, data: data2, error: error2 },
  ] = routeQueries();

  const formatLegData = (queryData: QueryData | undefined) => {
    if (queryData && queryData.plan.itineraries.length > 0) {
      const formattedLegs = queryData.plan.itineraries
        .map((itinerary) => {
          if (itinerary.legs.length === 3) {
            // 3 legs means walk->vehicle->walk
            return itinerary.legs[1];
          }
          if (itinerary.legs.length === 1) {
            // single leg means only walking
            return {
              ...itinerary.legs[0],
              route: { ...itinerary.legs[0].route, shortName: 'walk' },
            };
          }
          return undefined;
        })
        .filter((leg) => leg !== undefined); // filters out disallowed routes and empty arrays
      if (formattedLegs.length === 0) {
        return undefined;
      }
      return formattedLegs;
    }
    return undefined;
  };

  console.log('data1', data1, 'loading1', loading1, 'error1', error1);
  return {
    mainQueryLegs: formatLegData(data1),
    secondaryQueryLegs: formatLegData(data2),
  };
}
