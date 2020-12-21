import {ScrollView, Text, View} from "react-native";
import React from "react";
import {RouteLeg} from "./RouteLeg";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RouteLegUnit} from "./RouteLegUnit";
import {RouteStartEnd} from "./RouteStartEnd";
import {RouteMiddleSector} from "./RouteMiddleSector";
import {RouteMiddleSplitSector} from "./RouteMiddleSplitSector";
import {RouteMiddleMergeSector} from "./RouteMiddleMergeSector";


export function RouteContainer() {
    return (
        <ScrollView style={{
        }}>
            <RouteStartEnd name={"HOME"} emojiName={"home"}/>
            <RouteMiddleSector iconName={'walk'}/>
            <RouteLeg/>
            <RouteMiddleSector iconName={'bus'}/>
            <RouteLeg/>
            <RouteMiddleSplitSector iconName={'train'}/>
            <View style={{flexDirection: "row"}}>
                <RouteLeg/>
                <View style={{width: 2}}/>
                <RouteLeg/>
            </View>
            <RouteMiddleMergeSector iconName={'bus'}/>
            <RouteStartEnd name={"PARTIO"} emojiName={"tent"}/>
            <View style={{height: 50}}/>
        </ScrollView>
    )

}
