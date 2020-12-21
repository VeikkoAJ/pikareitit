import {Text, View} from "react-native";
import React from "react";

type RouteLegUnitProps = {
    name: String,
    departure: Date
}

export function RouteLegUnit({name, departure}: RouteLegUnitProps) {

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
        }}>
            <Text style={{fontSize: 18}}>{name}</Text>
            <Text style={{fontSize: 18}}>{departure.getHours().toString() + ":" + departure.getMinutes().toString() + ":" + departure.getSeconds().toString().padStart(2, '0')}</Text>
        </View>
    )
}
