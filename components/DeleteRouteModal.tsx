import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { routeLegColors } from '../styles/BasicColors';

interface DeleteRouteModalProps {
  routeName: string;
  deleteRoute: () => void;
  closeModal: () => void;
}

export default function DeleteRouteModal({
  routeName,
  deleteRoute,
  closeModal,
}: DeleteRouteModalProps) {
  return (
    <Modal animationType="slide" transparent presentationStyle="overFullScreen">
      <View>
        <Text>{`Delete ${routeName}?`}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              flex: 3,
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              backgroundColor: routeLegColors.light,
            }}
            onPress={() => {
              closeModal();
              deleteRoute();
            }}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
          <View style={{ width: 5 }} />
          <TouchableOpacity
            style={{
              flex: 3,
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              backgroundColor: routeLegColors.light,
            }}
            onPress={() => closeModal()}
          >
            <Text>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
