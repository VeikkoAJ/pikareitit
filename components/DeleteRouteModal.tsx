import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { routeLegColors } from '../styles/BasicColors';
import { createRouteStyles } from '../styles/CreateRouteStyles';
import { listStyles } from '../styles/BasicStyles';

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
      <View
        style={[
          createRouteStyles.smallModal,
          { marginTop: useWindowDimensions().height / 3 },
        ]}
      >
        <Text
          style={[listStyles.itemHeader, { flex: 1 }]}
        >{`Poista reitti: ${routeName}?`}</Text>
        <View style={{ flexDirection: 'row', flex: 1 }}>
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
            <Text style={{ color: 'white' }}>Poista</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 3,
              alignItems: 'center',
              padding: 10,
              marginHorizontal: 2.5,
              borderRadius: 10,
              backgroundColor: routeLegColors.light,
            }}
            onPress={() => closeModal()}
          >
            <Text style={{ color: 'white' }}>Peruuta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
