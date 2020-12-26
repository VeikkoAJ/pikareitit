import {ScrollView, Text, View} from "react-native";
import React, {useEffect} from "react";
import {RouteLeg} from "./RouteLeg";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {RouteLegUnit} from "./RouteLegUnit";
import {RouteStartEnd} from "./RouteStartEnd";
import {RouteMiddleSector} from "./RouteMiddleSector";
import {RouteMiddleSplitSector} from "./RouteMiddleSplitSector";
import {RouteMiddleMergeSector} from "./RouteMiddleMergeSector";
import {useQuery} from "@apollo/client";
import {routeRequest} from "../services/RouteFetcher";
import { format } from 'date-fns'


export type RouteContainerProps = {
    currentTime: Date
}

export function RouteContainer({currentTime}: RouteContainerProps) {

    const { loading, error, data } = useQuery(routeRequest,
        { variables: {
                from: "60.211039,24.825548",
                to: "60.219377,24.813573",
                date: format(currentTime, 'yyyy-MM-dd'),
                time: format(currentTime, 'HH:mm:ss')
            }}
        );

    console.log("error",error);
    console.log("data", data);

    return (
        <ScrollView style={{
        }}>
            <RouteStartEnd name={"HOME"} emojiName={"home"}/>
            <RouteMiddleSector iconName={'walk'}/>
            <RouteLeg
                routeLeg={!loading && !error ? {
                    startPlace: data.plan.itineraries[1].legs[1].from.name,
                    transportMode: data.plan.itineraries[1].legs[1].mode,
                    transportLegUnits: [{
                        name: data.plan.itineraries[0].legs[1].route.shortName,
                        startTime: parseInt(data.plan.itineraries[0].legs[1].startTime),
                        endTime: 0,
                        realTime: false
                    },
                    {
                        name: data.plan.itineraries[1].legs[1].route.shortName,
                        startTime: parseInt(data.plan.itineraries[1].legs[1].startTime),
                        endTime: 0,
                        realTime: true
                    },
                    {
                        name: data.plan.itineraries[2].legs[1].route.shortName,
                        startTime: parseInt(data.plan.itineraries[2].legs[1].startTime),
                        endTime: 0,
                        realTime: true
                    }]
                } : null}/>
            <RouteMiddleSector iconName={'bus'}/>
            <RouteLeg
                routeLeg={{
                    startPlace: "Leppävaaran asema",
                    transportMode: "rail",
                    transportLegUnits: null
                }}
            />
            <RouteMiddleSplitSector iconName={"train"}/>
            <RouteLeg
                routeLeg={{
                    startPlace: "Pukinmäen asema",
                    transportMode: "rail",
                    transportLegUnits: null
                }}
            />
            <RouteMiddleMergeSector iconName={"bus"}/>
            <RouteStartEnd name={"PARTIO"} emojiName={"tent"}/>
            <View style={{height: 50}}/>
        </ScrollView>
    )

}
