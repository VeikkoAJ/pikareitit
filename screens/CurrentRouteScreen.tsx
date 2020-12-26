import {StatusBar, Text, View} from "react-native";
import React from "react";

import {RouteScreenTopBar} from "../components/RouteScreenTopBar";
import {RouteContainer} from "../components/RouteContainer";



export function CurrentRouteScreen() {

    const currentTime = new Date(2020, 12, 26, 10, 0);
    return (
        <View style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
            backgroundColor: 'ivory'
        }}>
            <RouteScreenTopBar/>
            <RouteContainer currentTime={currentTime}/>
         </View>
    )
}
