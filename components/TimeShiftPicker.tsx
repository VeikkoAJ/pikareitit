import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

interface TimeShiftPickerProps {
  setTimeOffset: (timeOffset: number) => void;
  setShow: (show: boolean) => void;
}

const timeShiftArray = [-10, -3, 3, 10];

export default function TimeShiftPicker({
  setTimeOffset,
  setShow,
}: TimeShiftPickerProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {timeShiftArray.map((time, i) => (
        <TouchableOpacity
          key={time}
          style={[
            currentRouteStyles.topBarMinuteItem,
            {
              borderLeftWidth: i === 0 ? 2 : 1,
              borderRightWidth: i === timeShiftArray.length - 1 ? 0 : 1,
              borderBottomRightRadius: i === timeShiftArray.length - 1 ? 10 : 0,
            },
          ]}
          onPress={() => {
            setTimeOffset(time * 60 * 1000);
            setShow(false);
          }}
        >
          <Text style={currentRouteStyles.topBarMinuteText} numberOfLines={1}>
            {time > 0 ? `+${time}` : time}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
