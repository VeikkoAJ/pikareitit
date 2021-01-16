import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { listForm, routeLegColors } from '../styles/BasicColors';
import { TransportModePicker } from './TransportModePicker';
import { ListManipulationButton } from './ListManipulationButton';
import { RouteTransportLeg, TransportMode } from '../types';

interface RouteLegFormProps {
  routeLeg: RouteTransportLeg;
  showSettings: boolean;
  setShowSettings: () => void;
  setHideSettings: () => void;
  addRouteLeg: () => void;
  removeRouteLeg: () => void;
  moveRouteLeg: (yOffset: number, xOffset: number) => void;
  setRouteLeg: (routeLeg: RouteTransportLeg) => void;
}

export function RouteLegForm({
  routeLeg,
  showSettings,
  setShowSettings,
  setHideSettings,
  addRouteLeg,
  removeRouteLeg,
  moveRouteLeg,
  setRouteLeg,
}: RouteLegFormProps) {
  const [from, setFrom] = useState<string>(routeLeg.from);
  const [to, setTo] = useState<string>(routeLeg.to);
  const [secondaryTo, setSecondaryTo] = useState<string>(routeLeg.to);
  const [transportModes, setTransportModes] = useState<TransportMode[]>(
    routeLeg.transportModes
  );

  useEffect(() => {
    setRouteLeg({
      from,
      to,
      secondaryTo,
      transportModes,
    });
  }, [transportModes]);

  const refresh = () => {
    setRouteLeg({
      from,
      to,
      secondaryTo,
      transportModes,
    });
  };

  return (
    <Pressable
      style={{
        flex: 1,
        marginBottom: 5,
        paddingBottom: 5,
        paddingHorizontal: 10,
        backgroundColor: routeLegColors.light,
        borderRadius: 10,
        elevation: 1,
      }}
      onPress={() => setHideSettings()}
      onLongPress={() => setShowSettings()}
    >
      <View style={{ marginRight: 30, flexWrap: 'wrap' }}>
        <View style={[listForm.listTextInput, { flex: 1 }]}>
          <Text style={listForm.fieldName}>from:</Text>
          <TextInput
            style={listForm.fieldAnswer}
            value={from}
            onChangeText={(text) => setFrom(text)}
            onEndEditing={() => refresh()}
          />
        </View>
        <View style={[listForm.listTextInput, { flex: 1 }]}>
          <Text style={listForm.fieldName}>to:</Text>
          <TextInput
            style={listForm.fieldAnswer}
            value={to}
            onChangeText={(text) => setTo(text)}
            onEndEditing={() => refresh()}
          />
        </View>
      </View>
      <TransportModePicker
        transportModes={transportModes}
        setTransportModes={setTransportModes}
      />
      <View style={{ position: 'absolute', right: 0 }}>
        <ListManipulationButton
          buttonIcon="remove"
          size={16}
          color={routeLegColors.lightVisited}
          onButtonPress={() => removeRouteLeg()}
        />
      </View>
      {showSettings && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 50,
          }}
        >
          <ListManipulationButton
            buttonIcon="moveUp"
            size={16}
            color={routeLegColors.lightVisited}
            onButtonPress={() => moveRouteLeg(-1, 0)}
          />
          <ListManipulationButton
            buttonIcon="moveDown"
            size={16}
            color={routeLegColors.lightVisited}
            onButtonPress={() => moveRouteLeg(1, 0)}
          />
          <ListManipulationButton
            buttonIcon="add"
            size={16}
            color={routeLegColors.lightVisited}
            onButtonPress={() => addRouteLeg()}
          />
        </View>
      )}
    </Pressable>
  );
}
