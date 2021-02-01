import React from 'react';
import {Modal, Text, View} from 'react-native';
import {basicStyles, listStyles} from '../styles/BasicStyles';

interface InstructionsModalProps {

}

export default function InstructionsModal({}: InstructionsModalProps) {
  return (
    <Modal>
      <View style={basicStyles.base}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={basicStyles.charcoalHeader}>Ohjeet</Text>
        </View>
        <View style={{ minHeight: 30 }} />
        <View
          style={[
            listStyles.container,
            {
              flex: 1,
              justifyContent: 'space-between',
              paddingVertical: 0,
              paddingBottom: 0,
              marginBottom: 50,
            },
          ]}
        >
      </View>
    </Modal>
  );
}
