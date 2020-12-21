import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function RouteScreenTopBar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentDate(new Date()), 200);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return(
        <View style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            backgroundColor: '#ffffdc'
        }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: 'tomato',
                borderBottomEndRadius: 10,
                paddingEnd: 20,
                paddingStart: 10,
                elevation: 1,
                alignItems: "center"
            }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'white'
                }}>{currentDate.getHours().toString() + ":" + currentDate.getMinutes().toString() + ":" + currentDate.getSeconds().toString().padStart(2, '0')}</Text>
            </View>
            <TouchableOpacity style={{
                flexDirection: 'row',
                backgroundColor: 'tomato',
                borderBottomStartRadius: 10,
                paddingStart: 20,
                paddingEnd: 20,
                elevation: 1,
                alignItems: "center"
            }}>
                <MaterialCommunityIcons name={'menu'} size={30} color="white"/>
            </TouchableOpacity>
        </View>
    )
}
