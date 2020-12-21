import {StatusBar, Text, View} from "react-native";
import React from "react";

export function BrowseScreen() {
    return (
        <View style={{
            marginTop: StatusBar.currentHeight
        }}>
            <Text>here you can browse saved routes</Text>
        </View>
    )
}
