import {Text, View} from "react-native";
import React from "react";
import {RouteTransportLegUnit} from "../types";

type RouteLegUnitProps = {
    legUnit: RouteTransportLegUnit
}

export function RouteLegUnit({ legUnit }: RouteLegUnitProps) {

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
        }}>
            <Text style={{fontSize: 18}}>{legUnit.name}</Text>
            <Text style={{fontSize: 18}}>{legUnit.startTime.getHours().toString() + ":" + legUnit.startTime.getMinutes().toString() + ":" + legUnit.startTime.getSeconds().toString().padStart(2, '0')}</Text>
        </View>
    )
}
