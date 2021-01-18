import { TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { basicColors } from '../styles/BasicColors';
import BasicClock from './BasicClock';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

interface RouteScreenTopBarProps {
  setSearchTime: (time: Date) => void;
}

export function RouteScreenTopBar({ setSearchTime }: RouteScreenTopBarProps) {
  const [datePickerDate, setDatePickerDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDatePickerChange = (event, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSearchTime(selectedDate);
      setDatePickerDate(selectedDate);
    }
  };

  return (
    <View style={currentRouteStyles.topBar}>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={datePickerDate}
          mode="time"
          is24Hour
          display="default"
          onChange={onDatePickerChange}
        />
      )}
      <TouchableOpacity
        style={[currentRouteStyles.topBarItem, { borderBottomEndRadius: 10 }]}
        onPress={() => setShowDatePicker(true)}
      >
        <BasicClock />
      </TouchableOpacity>
      <TouchableOpacity
        style={[currentRouteStyles.topBarItem, { borderBottomStartRadius: 10 }]}
      >
        <MaterialCommunityIcons name="menu" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
