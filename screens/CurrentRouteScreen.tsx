import {StatusBar, Text, View} from "react-native";
import React from "react";

import {RouteScreenTopBar} from "../components/RouteScreenTopBar";
import {RouteContainer} from "../components/RouteContainer";



export function CurrentRouteScreen() {
    return (
        <View style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
            backgroundColor: 'ivory'
        }}>
            <RouteScreenTopBar/>
            <RouteContainer/>
         </View>
    )
}
