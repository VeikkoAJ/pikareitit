import { gql } from '@apollo/client';

export const routeRequest = gql`
  query route($from: String, $to: String, $date: String, $time: String) {
    plan(
      fromPlace: $from
      toPlace: $to
      date: $date
      time: $time
      numItineraries: 3
      transportModes: [
        { mode: BUS }
        { mode: RAIL }
        { mode: TRAM }
        { mode: SUBWAY }
        { mode: FERRY }
        { mode: WALK }
      ]
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
