import {ListView, Text, View} from "react-native";
import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RouteLegUnit} from "./RouteLegUnit";

export function RouteLeg() {
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
                    {"Todella pitkä paikan nimi 2, Espoo"}
                </Text>
                <MaterialCommunityIcons name={'bus'} size={30} color="white"/>
            </View>
            <RouteLegUnit name={"113"} departure={new Date()}/>
            <RouteLegUnit name={"502"} departure={new Date()}/>
            <RouteLegUnit name={"202"} departure={new Date()}/>
        </View>

    )
}
