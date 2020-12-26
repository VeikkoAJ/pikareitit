import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {format} from "date-fns";
import {basicColors} from "../styles/BasicColors";

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
            width: '100%',
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            zIndex: 1
        }}>
            <TouchableOpacity style={{
                flexDirection: 'row',
                backgroundColor: basicColors.topBarBackground,
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
                }}>
                    {format(currentDate, "HH:mm:ss")}
                </Text>
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
                <MaterialCommunityIcons name={'menu'} size={30} color="white"/>
            </TouchableOpacity>
        </View>
    )
}
