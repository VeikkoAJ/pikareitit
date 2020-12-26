import {StatusBar, Text, View} from "react-native";
import React from "react";

import {RouteScreenTopBar} from "../components/RouteScreenTopBar";
import {RouteContainer} from "../components/RouteContainer";
import {basicColors} from "../styles/BasicColors";



export function CurrentRouteScreen() {

    const currentTime = new Date(2020, 12, 26, 10, 0);
    return (
        <View style={{
            backgroundColor: basicColors.topBarLight,
            flex: 1
        }}>
            <View style={{
                height: StatusBar.currentHeight,
                backgroundColor: 'black'
            }}/>
            <View style={{
                flex: 1,
            }}>
                <RouteScreenTopBar/>
                <RouteContainer currentTime={currentTime}/>
            </View>
        </View>
    )
}
