import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

interface TimeShiftPickerProps {
  setTimeOffset: (timeOffset: number) => void;
  setShow: (show: boolean) => void;
}

export default function TimeShiftPicker({
  setTimeOffset,
  setShow,
}: TimeShiftPickerProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        style={[currentRouteStyles.topBarMinuteItem, { borderLeftWidth: 2 }]}
        onPress={() => {
          setTimeOffset(-10 * 60 * 1000);
          setShow(false);
        }}
      >
        <Text style={currentRouteStyles.topBarMinuteText}>-10</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={currentRouteStyles.topBarMinuteItem}
        onPress={() => {
          setTimeOffset(-3 * 60 * 1000);
          setShow(false);
        }}
      >
        <Text style={currentRouteStyles.topBarMinuteText}>-3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={currentRouteStyles.topBarMinuteItem}
        onPress={() => {
          setTimeOffset(0);
          setShow(false);
        }}
      >
        <Text style={currentRouteStyles.topBarMinuteText}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={currentRouteStyles.topBarMinuteItem}
        onPress={() => {
          setTimeOffset(3 * 60 * 1000);
          setShow(false);
        }}
      >
        <Text style={currentRouteStyles.topBarMinuteText}>+3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[currentRouteStyles.topBarMinuteItem, { borderRightWidth: 0 }]}
        onPress={() => {
          setTimeOffset(10 * 60 * 1000);
          setShow(false);
        }}
      >
        <Text style={currentRouteStyles.topBarMinuteText}>+10</Text>
      </TouchableOpacity>
    </View>
  );
}
