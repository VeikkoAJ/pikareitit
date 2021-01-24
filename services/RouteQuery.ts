import { gql } from '@apollo/client';

export const routeRequest = gql`
  query route(
    $fromPlace: String
    $toPlace: String
    $date: String
    $time: String
    $transportModes: [TransportMode]
  ) {
    plan(
      fromPlace: $fromPlace
      toPlace: $toPlace
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
