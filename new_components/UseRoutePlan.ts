import { useState } from 'react';
import { AddressBlock, MapLocation } from '../types';

const emptyAddressBlock = (x: number, y: number): AddressBlock => ({
  key: (new Date().getTime() / Math.random()).toString(),
  x,
  y,
  location: {
    address: '',
    lat: undefined,
    lon: undefined,
  },
});

export function UseRoutePlan() {
  const [routeBlockMatrix, setRouteBlockMatrix] = useState<AddressBlock[]>([
    emptyAddressBlock(0, 0),
    emptyAddressBlock(3, 2),
    emptyAddressBlock(1, 1),
  ]);
  const [routeConnectorMatrix, setRouteConnectorMatrix] = useState(undefined);

  const getAddressBlockAttIndex = (
    x: number,
    y: number
  ): AddressBlock | undefined =>
    routeBlockMatrix.filter((block) => block.x === x && block.y === y)[0];

  const getBlocksDroppedIndex = (
    x: number,
    y: number,
    routeBlocks: AddressBlock[] = routeBlockMatrix
  ): AddressBlock[] =>
    routeBlocks.filter((block) => block.y !== x && block.x !== x);

  const addRouteBLock = (x: number, y: number) => {
    if (getAddressBlockAttIndex(x, y) === undefined) {
      setRouteBlockMatrix([...routeBlockMatrix, emptyAddressBlock(x, y)]);
    }
  };

  const removeRouteBlock = (x: number, y: number) => {
    setRouteBlockMatrix(getBlocksDroppedIndex(x, y));
  };

  const swapRouteBlocks = (
    oldX: number,
    oldY: number,
    newX: number,
    newY: number
  ) => {
    const movingBlock = getAddressBlockAttIndex(oldX, oldY);
    const avoidingBlock = getAddressBlockAttIndex(newX, newY);
    if (movingBlock === undefined || newX < 0 || newY < 0) {
      return;
    }
    if (avoidingBlock === undefined) {
      setRouteBlockMatrix([
        ...getBlocksDroppedIndex(oldX, oldY),
        { ...movingBlock, x: newX, y: newY },
      ]);
      return;
    }
    setRouteBlockMatrix([
      ...getBlocksDroppedIndex(newX, newY, getBlocksDroppedIndex(oldX, oldY)),
      { ...movingBlock, x: newX, y: newY },
      { ...avoidingBlock, x: oldX, y: oldY },
    ]);
  };

  const getGridSize = (): { xSize: number; ySize: number } => ({
    xSize: 4 /* routeBlockMatrix
      .map((_) => _.x)
      .reduce((acc, cur) => (acc > cur ? acc : cur)),
      */,
    ySize:
      routeBlockMatrix
        .map((_) => _.y)
        .reduce((acc, cur) => (acc > cur ? acc : cur)) + 1,
  });

  const getAddressBlocks = () => routeBlockMatrix;
  const getAddressBlocksWithout = (x: number, y: number) =>
    getBlocksDroppedIndex(x, y);
  return {
    getAddressBlockAttIndex,
    addRouteBLock,
    removeRouteBlock,
    swapRouteBlocks,
    getGridSize,
    getAddressBlocks,
    getAddressBlocksWithout,
  };
}
