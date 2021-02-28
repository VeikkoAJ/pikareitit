import React, { useEffect, useRef, useState } from 'react';
import { Callout, Marker } from 'react-native-maps';
import { Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { Station, StopsQueryData } from '../transitStopsQueryTypes';
import { MapLocation, TransportMode } from '../types';
import { transitStopsRequest } from '../services/TransitStopsQuery';

export const transitLinesRequest = gql`
  query stop($stopId: String!) {
    stop(id: $stopId) {
      patterns {
        route {
          gtfsId
          shortName
          longName
          mode
        }
      }
    }
  }
`;
type Route = {
  gtfsId: string;
  shortName: string;
  longName: string;
  mode: TransportMode;
};
type Pattern = {
  route: Route;
};

type Stop = {
  patterns: Pattern[];
};

type TransitLinesQueryData = {
  stop: Stop;
};

interface StopStationMarkerProps {
  color: 'red' | 'blue' | 'green' | 'orange';
  stop: Station;
  descriptionPress: (location: MapLocation) => void;
  closeModal: () => void;
}

export default function StopStationMarker({
  color,
  stop,
  descriptionPress,
  closeModal,
}: StopStationMarkerProps) {
  const markerRef = useRef(null);

  const [preventLoading, setPreventLoading] = useState(true);
  const { loading, error, data } = useQuery<TransitLinesQueryData>(
    transitLinesRequest,
    {
      variables: {
        stopId: stop.gtfsId,
      },
      fetchPolicy: 'network-only', // cache caused errors in testing
      skip: preventLoading,
    }
  );

  useEffect(() => {
    markerRef.current.redraw();
  }, [data]);

  console.log(loading, error, error?.graphQLErrors, error?.message, data);
  return (
    <Marker
      ref={markerRef}
      key={stop.gtfsId}
      coordinate={{ latitude: stop.lat, longitude: stop.lon }}
      title={stop.name}
      description={stop.gtfsId}
      pinColor={color}
      onPress={() => {
        setPreventLoading(false);
        markerRef.current.redraw();
      }}
    >
      <Callout
        style={{ borderRadius: 5, borderWidth: 1 }}
        onPress={() => {
          descriptionPress({
            address: stop.name,
            lon: stop.lon,
            lat: stop.lat,
          });
          closeModal();
        }}
      >
        <Text style={{ fontSize: 18 }}>
          <Text>{stop.name}</Text>
          <Text
            style={{ fontSize: 16, fontStyle: 'italic' }}
          >{` ${stop.gtfsId}`}</Text>
        </Text>
        {data !== undefined && (
          <Text style={{ fontStyle: 'italic' }}>
            {data.stop.patterns
              .map((pattern) => pattern.route.shortName)
              .join(', ')}
          </Text>
        )}
      </Callout>
    </Marker>
  );
}
