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
        duration
        legs {
          mode
          startTime
          endTime
          duration
          realTime
          from {
            name
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
