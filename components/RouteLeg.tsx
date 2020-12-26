import {Text, View} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RouteLegUnit} from "./RouteLegUnit";
import {RouteTransportLeg} from "../types";

type RouteLegProps = {
    routeLeg: RouteTransportLeg | null
}

export function RouteLeg({ routeLeg }: RouteLegProps) {

    return (
        <View style={{
            flexShrink: 1,
            backgroundColor: 'orchid',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingTop: 5,
            paddingBottom: 15
        }}>
            <View style={{
                flexShrink: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 5,
            }}>
                <Text style={{
                        flexShrink: 1,
                        color: 'white',
                        fontSize: 24,
                }}>
                    {routeLeg != null ? routeLeg.startPlace : '_'}
                </Text>
                <MaterialCommunityIcons name={routeLeg != null ? routeLeg.transportMode : 'cross'} size={30} color="white"/>
            </View>
            {routeLeg?.transportLegUnits != undefined ? <RouteLegUnit legUnit={routeLeg.transportLegUnits[0]}/>: <Text>_</Text>}
            {routeLeg?.transportLegUnits != undefined ? <RouteLegUnit legUnit={routeLeg.transportLegUnits[1]}/>: <Text>_</Text>}
            {routeLeg?.transportLegUnits != undefined ? <RouteLegUnit legUnit={routeLeg.transportLegUnits[2]}/>: <Text>_</Text>}
        </View>

    )
}
