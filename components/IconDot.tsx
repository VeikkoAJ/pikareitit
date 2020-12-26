import {basicColors} from "../styles/BasicColors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {View} from "react-native";
import React from "react";

type IconDotProps = {
    name: string
}

export function IconDot({name}: IconDotProps) {
    return (
        <View style={{
            marginVertical: 2.5,
            marginHorizontal: 5,
            alignContent: 'center',
            backgroundColor: basicColors.routeLeg,
            borderRadius: 20,
            width: 40,
            height: 40,
            elevation: 1
        }}>
         <MaterialCommunityIcons
             style={{
                 paddingLeft: 7.5,
                 paddingTop: 7.5,
             }}
             name={name.toLowerCase()}
             size={25} color="white"
         />
     </View>
 )
}