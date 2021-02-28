import React, { useEffect, useRef } from 'react';
import MapView, { Callout, Marker, UrlTile } from 'react-native-maps';
import { Button, Dimensions, Pressable, Text } from 'react-native';
import { Station } from '../transitStopsQueryTypes';
import { MapLocation } from '../types';
import StopStationMarker from './StopStationMarker';

interface StopAndStationOSMProps {
  address: string | undefined;
  lat: number | undefined;
  lon: number | undefined;
  stops: Station[];
  stations: Station[];
  markerDescriptionPress: (location: MapLocation) => void;
  closeModal: () => void;
}

/**
 * Conmponent for showing searched stops and stations on HSL OSM tiles. Renders clickable markers for selecting the station or stop
 * @param address name of the searched location
 * @param lat latitude of the searched address
 * @param lon longitude of the searched address
 * @param stops array of HSL stops
 * @param stations array of HSL stations
 * @param markerDescriptionPress function triggered on marker description click
 * @param closeModal function that closes the parent view after the location is selected
 * @constructor
 */
export default function StopAndStationOSM({
  address,
  lat,
  lon,
  stops,
  stations,
  markerDescriptionPress,
  closeModal,
}: StopAndStationOSMProps) {
  const calculateMiddleCoordinate = () => {
    if (stops.length === 0 && stations.length === 0) {
      return { lat: 60.1710558, lon: 24.9404954 };
    }
    if (lat === undefined || lon === undefined) {
      return { lat: 60.1710558, lon: 24.9404954 };
    }
    const lats = [
      ...stops.map((_) => _.lat),
      ...stations.map((_) => _.lat),
      lat,
    ];
    const lons = [
      ...stops.map((_) => _.lon),
      ...stations.map((_) => _.lon),
      lon,
    ];
    const newLat = (Math.max(...lats) + Math.min(...lats)) / 2;
    const newLon = (Math.max(...lons) + Math.min(...lons)) / 2;
    return {
      lat: newLat,
      lon: newLon,
    };
  };

  const middleCoordinate = calculateMiddleCoordinate();

  const defaultCoordinateDelta = () => {
    if (stops.length === 0 && stations.length === 0) {
      return 0.003;
    }
    if (lat === undefined || lon === undefined) {
      return 0.003;
    }
    const lats = [
      ...stops.map((_) => Math.abs(_.lat - middleCoordinate.lat)),
      ...stations.map((_) => Math.abs(_.lat - middleCoordinate.lat)),
    ];
    const lons = [
      ...stops.map((_) => Math.abs(_.lon - middleCoordinate.lon)),
      ...stations.map((_) => Math.abs(_.lon - middleCoordinate.lon)),
    ];
    const latDelta = Math.max(...lats);
    const lonDelta = Math.max(...lons);

    return Math.max(latDelta * 2.4, lonDelta * 2.1);
  };

  return (
    <MapView
      style={{
        width: '100%',
        height: Dimensions.get('window').width,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'black',
        elevation: 1,
      }}
      region={{
        latitude: middleCoordinate.lat,
        longitude: middleCoordinate.lon,
        latitudeDelta: defaultCoordinateDelta(),
        longitudeDelta: defaultCoordinateDelta(),
      }}
    >
      <UrlTile
        urlTemplate="https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png"
        tileSize={512}
        zIndex={-1}
      />
      {lat !== undefined && lon !== undefined && (
        <Marker key="address" coordinate={{ latitude: lat, longitude: lon }} />
      )}
      {stops.length > 0 &&
        stops.map((stop) => (
          <StopStationMarker
            key={stop.gtfsId}
            color="blue"
            stop={stop}
            closeModal={closeModal}
            descriptionPress={markerDescriptionPress}
          />
        ))}
      {stations.length > 0 &&
        stations.map((station) => (
          <StopStationMarker
            key={station.gtfsId}
            color="blue"
            stop={station}
            closeModal={closeModal}
            descriptionPress={markerDescriptionPress}
          />
        ))}
    </MapView>
  );
}
