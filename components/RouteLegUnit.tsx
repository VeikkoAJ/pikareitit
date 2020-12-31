import React from "react";
import { Text, View } from "react-native";
import { format } from "date-fns";
import { RouteTransportLegUnit } from "../types";
import { routeLegColors } from "../styles/BasicColors";

type RouteLegUnitProps = {
  legUnit: RouteTransportLegUnit;
};

export function RouteLegUnit({ legUnit }: RouteLegUnitProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: routeLegColors.charCoalText,
        }}
      >
        {legUnit.name}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: routeLegColors.charCoalText,
        }}
      >
        {format(new Date(legUnit.startTime), "HH:mm:ss")}
      </Text>
    </View>
  );
}
