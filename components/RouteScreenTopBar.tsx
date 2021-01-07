import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {format} from "date-fns";
import DateTimePicker from '@react-native-community/datetimepicker';
import {basicColors} from "../styles/BasicColors";
import BasicClock from './BasicClock';

interface RouteScreenTopBarProps {
    setSearchTime: (time: Date) => void
}

export function RouteScreenTopBar({ setSearchTime }: RouteScreenTopBarProps) {

    const [datePickerDate, setDatePickerDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    const onDatePickerChange = (event, selectedDate?: Date) => {
        setShowDatePicker(false)
        if (selectedDate) {
            setSearchTime(selectedDate)
            setDatePickerDate(selectedDate)
        }
    }

    return(
        <View style={{
            height: 50,
            width: '100%',
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            zIndex: 1
        }}>
            {showDatePicker &&
                <DateTimePicker
                  testID='dateTimePicker'
                  value={datePickerDate}
                  mode='time'
                  is24Hour
                  display="default"
                  onChange={onDatePickerChange}


                />
            }
            <TouchableOpacity style={{
                flexDirection: 'row',
                backgroundColor: basicColors.topBarBackground,
                borderBottomEndRadius: 10,
                paddingEnd: 20,
                paddingStart: 10,
                elevation: 1,
                alignItems: "center"
            }}
            onPress={() => setShowDatePicker(true)}>
                <BasicClock/>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flexDirection: 'row',
                backgroundColor: basicColors.topBarBackground,
                borderBottomStartRadius: 10,
                paddingStart: 20,
                paddingEnd: 20,
                elevation: 1,
                alignItems: "center"
            }}>
                <MaterialCommunityIcons name='menu' size={30} color="white"/>
            </TouchableOpacity>
        </View>
    )
}
