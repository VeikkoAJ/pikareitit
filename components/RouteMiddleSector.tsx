import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {RouteMiddleSectorProps} from "../types";

export function RouteMiddleSector({iconName}: RouteMiddleSectorProps) {
    return (
        <View style={{
            marginVertical: 10,
            alignItems: 'center',
            paddingHorizontal: 10,
        }}>
            <View style={{
                backgroundColor: 'orchid',
                borderRadius: 10,
                width: 20,
                height: 20
            }}/>
            <View style={{
                marginVertical: 5,
                alignContent: 'center',
                backgroundColor: 'orchid',
                borderRadius: 20,
                width: 40,
                height: 40
            }}>
                <MaterialCommunityIcons style={{paddingLeft: 7.5, paddingTop: 7.5}} name={iconName} size={25} color="black"/>
            </View>

            <View style={{
                backgroundColor: 'orchid',
                borderRadius: 10,
                width: 20,
                height: 20
            }}/>
        </View>
    )
}
