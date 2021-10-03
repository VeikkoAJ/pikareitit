import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { AddressBlock, MapLocation } from '../types';
import StopAddressSearch from '../components/StopAddressSearch';
import { StationsQueryData, StopsQueryData } from '../transitStopsQueryTypes';
import { basicColors } from '../styles/BasicColors';

interface AddressBlockProps {
  position: { x: number; y: number };
  width: number;
  height: number;
  addressBlock: AddressBlock;
  stops: StopsQueryData | undefined;
  stations: StationsQueryData | undefined;
}

export default function AddressBlockRender({
  position,
  width,
  height,
  addressBlock,
  stops,
  stations,
}: AddressBlockProps) {
  const [mapLocation, setMapLocation] = useState<MapLocation>(
    addressBlock.location
  );
  return (
    <Pressable
      pointerEvents="box-only"
      key={addressBlock.key}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width,
        height,
        backgroundColor: basicColors.secondaryLight,
      }}
    >
      <StopAddressSearch
        name="pysäkki tai osoite"
        defaultValue={mapLocation.address}
        stops={stops}
        stations={stations}
        changeLocation={(location) => setMapLocation(location)}
      />
    </Pressable>
  );
}
