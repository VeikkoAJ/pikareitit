import {StatusBar, Text, View} from "react-native";
import React from "react";


export function HomeScreen() {
    return (
        <View style={{
            marginTop: StatusBar.currentHeight
        }}>
            <Text>home screen</Text>
        </View>
    )
}
