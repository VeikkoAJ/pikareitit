import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RouteLegUnit} from "./RouteLegUnit";
import {RouteTransportLeg} from "../types";
import {basicColors} from "../styles/BasicColors";

type RouteLegProps = {
    routeLeg: RouteTransportLeg | null
}

export function RouteLeg({ routeLeg }: RouteLegProps) {

    return (
        <TouchableOpacity style={{
            flexShrink: 1,
            backgroundColor: basicColors.routeLegLight,
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingTop: 5,
            paddingBottom: 15,
            elevation: 1
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
                <MaterialCommunityIcons name={routeLeg != null ? routeLeg.transportMode.toLowerCase() : 'cross'} size={30} color="white"/>
            </View>
            {routeLeg?.transportLegUnits != undefined ? <RouteLegUnit legUnit={routeLeg.transportLegUnits[0]}/>: <Text>_</Text>}
            {routeLeg?.transportLegUnits != undefined ? <RouteLegUnit legUnit={routeLeg.transportLegUnits[1]}/>: <Text>_</Text>}
            {routeLeg?.transportLegUnits != undefined ? <RouteLegUnit legUnit={routeLeg.transportLegUnits[2]}/>: <Text>_</Text>}
        </TouchableOpacity>

    )
}
