import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const routeRequest = gql`
  query route(
    $fromLat: Float!
    $fromLon: Float!
    $toLat: Float!
    $toLon: Float!
    $date: String
    $time: String
    $transportModes: [TransportMode]
  ) {
    plan(
      from: { lat: $fromLat, lon: $fromLon }
      to: { lat: $toLat, lon: $toLon }
      date: $date
      time: $time
      numItineraries: 3
      transportModes: $transportModes
    ) {
      itineraries {
        legs {
          mode
          startTime
          endTime
          duration
          realTime
          from {
            name
            stop {
              platformCode
            }
          }
          to {
            name
          }
          route {
            shortName
          }
        }
      }
    }
  }
`;
