import {Text, View} from "react-native";
import React from "react";
import {RouteTransportLegUnit} from "../types";
import {format} from "date-fns";

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
            <Text style={{fontSize: 18}}>{format(new Date(legUnit.startTime), "HH:mm:ss")}</Text>
        </View>
    )
}
