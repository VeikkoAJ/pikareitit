import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {RouteMiddleSectorProps} from "../types";
import {basicColors} from "../styles/BasicColors";
import {SmallDot} from "./SmallDot";
import {IconDot} from "./IconDot";

export function RouteMiddleSector({iconName}: RouteMiddleSectorProps) {
    return (
        <View style={{
            marginVertical: 10,
            alignItems: 'center',
            paddingHorizontal: 10,
        }}>
            <SmallDot/>
            <IconDot name={iconName}/>
            <SmallDot/>
        </View>
    )
}
