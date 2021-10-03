import { useState } from 'react';
import { GestureResponderEvent, NativeSyntheticEvent } from 'react-native';

const inRange = (value: number, range: number): number => {
  if (Math.abs(value) < range) {
    return 0;
  }
  if (value < 0) {
    return -1;
  }
  return 1;
};

export function UseMoveBlock(
  offsetWidth: number,
  offsetHeight: number,
  gridWidth: number,
  gridHeight: number,
  cellWidth: number,
  cellHeight: number,
  onRelease: (x: number, y: number) => void,
  onMove: (x: number, y: number) => void
) {
  const snapRadiusX = cellWidth * 0.25;
  const snapRadiusY = cellHeight * 0.25;

  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  /**
   * Distance from the center of a grid cell
   */
  const [touchOffset, setTouchOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [cellGridPosition, setCellGridPosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);

  const onTouchStart = (e: GestureResponderEvent) => {
    console.log('touch start', e.nativeEvent);
    const xPosition = e.nativeEvent.changedTouches[0].pageX - offsetWidth;
    const yPosition = e.nativeEvent.changedTouches[0].pageY - offsetHeight;
    setTouchPosition({
      x: xPosition,
      y: yPosition,
    });
    setTouchOffset({
      x: xPosition - Math.floor(xPosition / cellWidth) * cellWidth,
      y: yPosition - Math.floor(yPosition / cellHeight) * cellHeight,
    });
    setCellGridPosition({
      x: Math.floor(xPosition / cellWidth),
      y: Math.floor(yPosition / cellHeight),
    });
  };
  const onTouchMove = (e: GestureResponderEvent) => {
    const xPosition = e.nativeEvent.changedTouches[0].pageX - offsetWidth;
    const yPosition = e.nativeEvent.changedTouches[0].pageY - offsetHeight;
    setTouchPosition({ x: xPosition, y: yPosition });
  };
  const onTouchEnd = (e: GestureResponderEvent) => {
    if (touchPosition.x !== undefined && touchPosition.y !== undefined) {
      console.log('touch end: ');
      const xDelta =
        e.nativeEvent.changedTouches[0].pageX - touchPosition.x - offsetWidth;
      const yDelta =
        e.nativeEvent.changedTouches[0].pageY - touchPosition.y - offsetHeight;
      if (
        inRange(xDelta, cellWidth) !== 0 ||
        inRange(yDelta, cellHeight) !== 0
      ) {
        onRelease(inRange(xDelta, cellWidth), inRange(yDelta, cellHeight));
      }
    }
    setCellGridPosition(undefined);
  };

  const getCellGridPosition = () => {
    return cellGridPosition;
  };
  const getBlockPosition = () => {
    return {
      x: touchPosition.x - touchOffset.x,
      y: touchPosition.y - touchOffset.y,
    };
  };
  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getCellGridPosition,
    getBlockPosition,
  };
}
