import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { MapLocation, RouteTransportLeg } from '../types';
import { routeRequest } from '../services/RouteQuery';
import { QueryData } from '../routeQueryTypes';

/**
 * converts mapLocation to a string format used by the graphQL schema
 * @param mapLocation
 */
const mapLocationToString = (mapLocation: MapLocation) =>
  `${mapLocation.address}::${mapLocation.lat},${mapLocation.lon}`;

/**
 * Queries HSL graphql servers for 3 itineraries
 * @param routeLeg main parameters for itinerary
 * @param startTime time when itinerary starts
 * @param isOld if true skips the query
 */
export default function UseRouteQuery(
  routeLeg: RouteTransportLeg,
  startTime: Date | undefined,
  isOld: boolean
) {
  const routeQueries = () => {
    const mainResult = useQuery<QueryData>(routeRequest, {
      variables: {
        fromPlace: mapLocationToString(routeLeg.from),
        toPlace: mapLocationToString(routeLeg.to),
        date: format(
          startTime !== undefined ? startTime : new Date(),
          'yyyy-MM-dd'
        ),
        time: format(
          startTime !== undefined ? startTime : new Date(),
          'HH:mm:ss'
        ),
        transportModes: [...routeLeg.transportModes, { mode: 'WALK' }],
      },
      fetchPolicy: 'cache-first',
      skip: isOld || startTime === undefined,
    });
    const secondaryResult = useQuery<QueryData>(routeRequest, {
      variables: {
        fromPlace: mapLocationToString(routeLeg.from),
        toPlace:
          routeLeg.secondaryTo !== undefined
            ? mapLocationToString(routeLeg.secondaryTo)
            : '',
        date: format(
          startTime !== undefined ? startTime : new Date(),
          'yyyy-MM-dd'
        ),
        time: format(
          startTime !== undefined ? startTime : new Date(),
          'HH:mm:ss'
        ),
        transportModes: [...routeLeg.transportModes, { mode: 'WALK' }],
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

  /**
   * Removes walking sections from the start and end of the itinerary.
   * maps single leg itineraries as walking
   * @param queryData
   */
  const formatLegData = (queryData: QueryData | undefined) => {
    if (queryData && queryData.plan.itineraries.length > 0) {
      const formattedLegs = queryData.plan.itineraries
        .map((itinerary) => {
          // 3 legs = walk->vehicle->walk
          if (itinerary.legs.length === 3) {
            return itinerary.legs[1];
          }
          // single leg = only walking
          if (itinerary.legs.length === 1) {
            return {
              ...itinerary.legs[0],
              route: { ...itinerary.legs[0].route, shortName: 'WALK' },
            };
          }
          // disallowed routes set to undefined
          return undefined;
        })
        .filter((leg) => leg !== undefined); // filters out disallowed routes set undefined earlier
      if (formattedLegs.length === 0) {
        return undefined;
      }
      return formattedLegs;
    }
    return undefined;
  };

  return {
    /** query using routeLeg.from -> routeLeg.to) */
    mainQueryLegs: formatLegData(data1),
    /** query using routeLeg.from -> routeLeg.secondaryTo) always undefined if secondaryTo is undefined */
    secondaryQueryLegs: formatLegData(data2),
  };
}
