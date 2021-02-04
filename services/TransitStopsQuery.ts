import { gql } from '@apollo/client';

export const transitStopsRequest = gql`
  query stops {
    stops {
      gtfsId
      name
      lat
      lon
    }
  }
`;

export const transitStationsRequest = gql`
  query stations {
    stations {
      gtfsId
      name
      lat
      lon
    }
  }
`;
