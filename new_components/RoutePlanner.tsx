import React, { useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { listStyles } from '../styles/BasicStyles';
import { UseRoutePlan } from './UseRoutePlan';
import AddressBlockRender from './AddressBlockRender';
import UseTransitStopsQuery from '../hooks/UseTransitStopsQuery';
import EmptyBlock from './EmptyBlock';
import { UseMoveBlock } from '../hooks/UseMoveBlock';

const _ = require('lodash');

interface RoutePlannerProps {
  test: string;
  // loadRoute
  // saveRoute
}

export default function RoutePlanner({ test }: RoutePlannerProps) {
  const width = useWindowDimensions().width / 4;
  const height = width * 0.5;
  const { stops, stations } = UseTransitStopsQuery();
  const {
    getAddressBlockAttIndex,
    addRouteBLock,
    removeRouteBlock,
    swapRouteBlocks,
    getGridSize,
    getAddressBlocks,
    getAddressBlocksWithout,
  } = UseRoutePlan();
  const {
    getCellGridPosition,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getBlockPosition,
  } = UseMoveBlock(
    0,
    76,
    getGridSize().xSize,
    getGridSize().ySize,
    width,
    height,
    (newX: number, newY: number) => {
      console.log(' ');
    },
    (x, y) => {
      console.log(' ');
    }
  );
  return (
    <ScrollView
      style={[
        listStyles.container,
        {
          paddingHorizontal: 0,
          paddingVertical: 0,
          paddingTop: 0,
          marginBottom: 50,
        },
      ]}
    >
      <View
        style={{
          backgroundColor: 'gainsboro',
          width: 4 * width,
          height: (getGridSize().ySize + 1) * height,
        }}
        pointerEvents="none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {getCellGridPosition()?.x !== undefined &&
        getCellGridPosition()?.y !== undefined ? (
          <AddressBlockRender
            position={getBlockPosition()}
            width={width}
            height={height}
            addressBlock={getAddressBlockAttIndex(
              getCellGridPosition().x,
              getCellGridPosition().y
            )}
            stops={stops}
            stations={stations}
          />
        ) : (
          <></>
        )}
        {getCellGridPosition() !== undefined
          ? getAddressBlocksWithout(
              getCellGridPosition().x,
              getCellGridPosition().y
            ).map((block) => (
              <AddressBlockRender
                key={block.key}
                position={{ x: block.x * width, y: block.y * height }}
                width={width}
                height={height}
                addressBlock={block}
                stops={stops}
                stations={stations}
              />
            ))
          : getAddressBlocks().map((block) => (
              <AddressBlockRender
                key={block.key}
                position={{ x: block.x * width, y: block.y * height }}
                width={width}
                height={height}
                addressBlock={block}
                stops={stops}
                stations={stations}
              />
            ))}
      </View>
    </ScrollView>
  );
}
