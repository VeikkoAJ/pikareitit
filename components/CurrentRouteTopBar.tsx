import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { format } from 'date-fns';
import BasicClock from './BasicClock';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';
import TimeShiftPicker from './TimeShiftPicker';

interface RouteScreenTopBarProps {
  timeShift: number;
  setTimeOffset: (timeOffset: number) => void;
}

/**
 * @param setTimeOffset sets how much earlier or later itineraries should be queued in millis seconds
 */
export function CurrentRouteTopBar({
  timeShift,
  setTimeOffset,
}: RouteScreenTopBarProps) {
  const [showtimePicker, setShowTimePicker] = useState(false);

  return (
    <View style={currentRouteStyles.topBar}>
      <View
        style={[currentRouteStyles.topBarItem, { borderBottomEndRadius: 10 }]}
      >
        <Pressable
          style={{
            paddingStart: 20,
            paddingEnd: timeShift === 0 ? 15 : 5,
          }}
          onPress={() => {
            if (timeShift === 0) {
              setShowTimePicker(true);
            }
            if (timeShift !== 0) {
              setTimeOffset(0);
            }
            if (showtimePicker) {
              setShowTimePicker(false);
            }
          }}
        >
          <BasicClock />
        </Pressable>
        {showtimePicker && (
          <TimeShiftPicker
            setTimeOffset={setTimeOffset}
            setShow={() => setShowTimePicker(false)}
          />
        )}
        {!showtimePicker && timeShift !== 0 && (
          <TouchableOpacity
            style={[
              currentRouteStyles.topBarMinuteItem,
              { paddingLeft: 0, borderLeftWidth: 0, borderRightWidth: 0 },
            ]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={currentRouteStyles.topBarMinuteText}>
              {`${timeShift > 0 ? '+' : ''}${timeShift / 60000.0}`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Right top corner settings icon
// <TouchableOpacity
//    style={[currentRouteStyles.topBarItem, { borderBottomStartRadius: 10 }]}
// >
//    <MaterialCommunityIcons name="menu" size={30} color="white" />
// </TouchableOpacity>
