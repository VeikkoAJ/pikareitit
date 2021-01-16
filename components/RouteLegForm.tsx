import { Pressable, Text, TextInput, View } from 'react-native';
import { listForm, routeLegColors } from '../styles/BasicColors';
import React, { useEffect, useState } from 'react';
import { TransportModePicker } from './TransportModePicker';
import { ListManipulationButton } from './ListManipulationButton';
import { RouteLegKeyPair, RouteTransportLeg, TransportMode } from '../types';

interface RouteLegFormProps {
  routeLegKeyPair: RouteLegKeyPair;
  showSettings: boolean;
  setShowSettings: () => void;
  setHideSettings: () => void;
  removeRouteLeg: () => void;
  moveRouteLeg: (newIndex: number) => void;
  setRouteLeg: (routeLegKeyPair1: RouteLegKeyPair) => void;
}

export function RouteLegForm({
  routeLegKeyPair,
  showSettings,
  setShowSettings,
  setHideSettings,
  removeRouteLeg,
  moveRouteLeg,
  setRouteLeg,
}: RouteLegFormProps) {
  const [from, setFrom] = useState<string>(routeLegKeyPair.routeLeg.from);
  const [to, setTo] = useState<string>(routeLegKeyPair.routeLeg.to);
  const [secondaryTo, setSecondaryTo] = useState<string>(
    routeLegKeyPair.routeLeg.to
  );
  const [transportModes, setTransportModes] = useState<TransportMode[]>(
    routeLegKeyPair.routeLeg.transportModes
  );

  useEffect(() => {
    setRouteLeg({
      key: routeLegKeyPair.key,
      routeLeg: {
        from,
        to,
        secondaryTo,
        transportModes,
      },
    });
  }, [transportModes]);

  const refresh = () => {
    setRouteLeg({
      key: routeLegKeyPair.key,
      routeLeg: {
        from,
        to,
        secondaryTo,
        transportModes,
      },
    });
  };

  return (
    <Pressable
      style={{
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
      <View style={listForm.listTextInput}>
        <Text style={listForm.fieldName}>from:</Text>
        <TextInput
          style={[listForm.fieldAnswer, { marginRight: 30 }]}
          value={from}
          onChangeText={(text) => setFrom(text)}
          onEndEditing={() => refresh()}
        />
      </View>
      <View style={listForm.listTextInput}>
        <Text style={listForm.fieldName}>to:</Text>
        <TextInput
          style={listForm.fieldAnswer}
          value={to}
          onChangeText={(text) => setTo(text)}
          onEndEditing={() => refresh()}
        />
      </View>
      <Text style={listForm.fieldName}>Travel modes:</Text>
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
          <Text>hello</Text>
          <ListManipulationButton
            buttonIcon="moveUp"
            size={16}
            color={routeLegColors.lightVisited}
            onButtonPress={() => moveRouteLeg(1)}
          />
          <ListManipulationButton
            buttonIcon="moveDown"
            size={16}
            color={routeLegColors.lightVisited}
            onButtonPress={() => moveRouteLeg(-1)}
          />
        </View>
      )}
    </Pressable>
  );
}
