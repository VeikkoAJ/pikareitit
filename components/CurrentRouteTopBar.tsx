import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import BasicClock from './BasicClock';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';
import TimeShiftPicker from './TimeShiftPicker';
import { basicColors } from '../styles/BasicColors';

interface RouteScreenTopBarProps {
  timeOffset: number;
  setTimeOffset: (timeOffset: number) => void;
}

/**
 * @param setTimeOffset sets how much earlier or later itineraries should be queued in millis seconds
 */
export default function CurrentRouteTopBar({
  timeOffset,
  setTimeOffset,
}: RouteScreenTopBarProps) {
  const [showtimePicker, setShowTimePicker] = useState(false);

  return (
    <View style={[currentRouteStyles.topBar, { flexWrap: 'wrap' }]}>
      {showtimePicker && (
        <TimeShiftPicker
          setTimeOffset={setTimeOffset}
          setShow={() => setShowTimePicker(false)}
        />
      )}
      {!showtimePicker && timeOffset !== 0 && (
        <TouchableOpacity
          style={[
            currentRouteStyles.topBarMinuteItem,
            { paddingLeft: 0, borderLeftWidth: 0, borderRightWidth: 0 },
          ]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={currentRouteStyles.topBarMinuteText}>
            {`${timeOffset > 0 ? '+' : ''}${timeOffset / 60000.0}`}
          </Text>
        </TouchableOpacity>
      )}
      <Pressable
        style={{
          backgroundColor: basicColors.topBarBackground,
          flexShrink: 20,
          paddingStart: 20,
          paddingBottom: 5,
          borderBottomRightRadius: showtimePicker || s ? 0 : 10,
          paddingEnd: timeOffset === 0 ? 15 : 5,
          elevation: 3,
        }}
        onPress={() => {
          if (showtimePicker) {
            setShowTimePicker(false);
            setTimeOffset(0);
            return;
          }
          if (timeOffset !== 0) {
            setTimeOffset(0);
            return;
          }
          setShowTimePicker(true);
        }}
      >
        <BasicClock />
      </Pressable>
    </View>
  );
}

// Right top corner settings icon
// <TouchableOpacity
//    style={[currentRouteStyles.topBarItem, { borderBottomStartRadius: 10 }]}
// >
//    <MaterialCommunityIcons name="menu" size={30} color="white" />
// </TouchableOpacity>
