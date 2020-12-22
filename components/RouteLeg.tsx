import {Text, View} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RouteLegUnit} from "./RouteLegUnit";
import {RouteTransportLeg} from "../types";

type RouteLegProps = {
    routeLeg: RouteTransportLeg
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
                <Text
                    style={{
                        flexShrink: 1,
                        color: 'white',
                        fontSize: 24,
                    }}
                >
                    {routeLeg.startPlace}
                </Text>
                <MaterialCommunityIcons name={routeLeg.transportMode} size={30} color="white"/>
            </View>
            <RouteLegUnit legUnit={routeLeg.transportLegUnits[0]} />
            <RouteLegUnit legUnit={routeLeg.transportLegUnits[1]}/>
            <RouteLegUnit legUnit={routeLeg.transportLegUnits[2]}/>
        </View>

    )
}
