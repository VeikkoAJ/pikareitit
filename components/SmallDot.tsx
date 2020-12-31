import {basicColors, routeLegColors} from "../styles/BasicColors";
import {View} from "react-native";
import React from "react";


export function SmallDot() {
    return (
        <View style={{
            marginVertical: 5,
            marginHorizontal: 5,
            backgroundColor: routeLegColors.light,
            borderRadius: 10,
            width: 20,
            height: 20,
            elevation: 1
        }}/>
    )
}