import {Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";

type RouteStartEndProps = {
    name: string
    emojiName: String
}

export function RouteStartEnd({name, emojiName}: RouteStartEndProps) {
    return (
        <View style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: 'center'
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                <Text
                    style={{
                        fontSize: 24,
                        color: 'black',
                        paddingEnd: 5
                    }}
                >
                    {name}
                </Text>
                <MaterialCommunityIcons name={emojiName} size={30} color="black"/>
            </View>
        </View>
    )
}
