import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { RouteTransportLegUnit } from "../types";
import { routeLegColors } from "../styles/BasicColors";
import {MaterialCommunityIcons} from '@expo/vector-icons';

interface RouteLegUnitProps {
  legUnit: RouteTransportLegUnit;
  showAdditional: boolean
}

export function RouteLegUnit({ legUnit, showAdditional = true }: RouteLegUnitProps) {

  const routeName = () => {
    if (legUnit.name === 'Walk') {
      return (
        <MaterialCommunityIcons
          style={{
            alignSelf: 'flex-end',
            paddingBottom: 3
          }}
          name='walk'
          size={18}

          color={routeLegColors.charCoalText}
        />
      )
    }
    return (
      <Text
        key='routeName'
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: routeLegColors.charCoalText,
        }}
      >
        {legUnit.name}
      </Text>
    )

  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
      }}
    >
      {routeName()}
      <Text>
        <Text
          key='startTime'
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: routeLegColors.charCoalText,
          }}
        >
          {`${format(legUnit.startTime, "HH:mm")  }`}
        </Text>
        {showAdditional && <Text
          key='endTime'
          style={{
            fontSize: 18,
            color: routeLegColors.charCoalText,
          }}
        >
          {`→${  format(legUnit.endTime, "HH:mm")}`}
        </Text>}
        {showAdditional && legUnit.secondaryEndTime && <Text
          style={{
            fontSize: 18,
            fontStyle: 'italic',
            color: routeLegColors.charCoalText,
          }}
        >
          {`→${  format(legUnit.secondaryEndTime, "HH:mm")}`}
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
