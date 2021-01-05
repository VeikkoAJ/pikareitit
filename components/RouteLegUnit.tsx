import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { RouteTransportLegUnit } from "../types";
import { routeLegColors } from "../styles/BasicColors";

interface RouteLegUnitProps {
  legUnit: RouteTransportLegUnit;
  showAdditional: boolean
}

export function RouteLegUnit({ legUnit, showAdditional = true }: RouteLegUnitProps) {
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
      <Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: routeLegColors.charCoalText,
          }}
        >
          {`${format(legUnit.startTime, "HH:mm")  }`}
        </Text>
        {showAdditional && <Text
          style={{
            fontSize: 18,
            color: routeLegColors.charCoalText,
          }}
        >
          {`→${  format(legUnit.endTime, "HH:mm")}`}
        </Text>}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
    greyText: {
        fontSize: 18,
        fontWeight: "bold",
        color: routeLegColors.charCoalText,
    }
})
