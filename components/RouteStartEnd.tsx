import {Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {basicColors} from "../styles/BasicColors";

type RouteStartEndProps = {
    name: string
    emojiName: String
}

export function RouteStartEnd({name, emojiName}: RouteStartEndProps) {
    return (
        <View style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: basicColors.routeLegLight,
            borderRadius: 10,
            elevation: 1
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: 'white',
                        paddingEnd: 5
                    }}
                >
                    {name}
                </Text>
                <MaterialCommunityIcons name={emojiName} size={30} color="white"/>
            </View>
        </View>
    )
}
