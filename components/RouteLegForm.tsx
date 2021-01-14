import { Pressable, Text, TextInput, View } from 'react-native';
import { listForm, routeLegColors } from '../styles/BasicColors';
import React, { useState } from 'react';
import { TransportModePicker } from './TransportModePicker';
import { TransportMode } from '../types';
import { AddRemoveButton } from './AddRemoveButton';

interface RouteLegFormProps {
  showSettings: boolean;
  setShowSettings: () => void;
}

export function RouteLegForm({
  showSettings,
  setShowSettings,
}: RouteLegFormProps) {
  const [transportModes, setTransportModes] = useState<TransportMode[]>([]);

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
      onLongPress={() => setShowSettings()}
    >
      <View style={listForm.listTextInput}>
        <Text style={listForm.fieldName}>from:</Text>
        <TextInput
          style={[listForm.fieldAnswer, { marginRight: 30 }]}
          value="empty"
        />
      </View>
      <View style={listForm.listTextInput}>
        <Text style={listForm.fieldName}>to:</Text>
        <TextInput style={listForm.fieldAnswer} value="empty" />
      </View>
      <Text style={listForm.fieldName}>Travel modes:</Text>
      <TransportModePicker
        transportModes={transportModes}
        setTransportModes={setTransportModes}
      />
      <View style={{ position: 'absolute', right: 0 }}>
        <AddRemoveButton
          addRemove="remove"
          size={16}
          color={routeLegColors.lightVisited}
          onButtonPress={() => console.log('press')}
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
          <AddRemoveButton
            addRemove="remove"
            size={16}
            color={routeLegColors.lightVisited}
            onButtonPress={() => console.log('press')}
          />
        </View>
      )}
    </Pressable>
  );
}
