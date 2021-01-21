import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { listForm } from '../styles/BasicColors';
import { createRouteStyles } from '../styles/CreateRouteStyles';
import { UseAddressSearch } from '../hooks/UseAddressSearch';
import { MapLocation } from '../types';

interface AddressSearchProps {
  name: string;
  defaultValue: string;
  changeLocation: (location: MapLocation) => void;
}

export default function AddressSearch({
  name,
  defaultValue,
  changeLocation,
}: AddressSearchProps) {
  const [showModal, setShowModal] = useState(false);
  const { searchResult, search } = UseAddressSearch();
  return (
    <View style={{ paddingTop: 5 }}>
      <Text numberOfLines={1} style={[listForm.fieldName, { flex: 1 }]}>
        {name}
      </Text>
      <Text
        style={[listForm.fieldAnswer, {}]}
        onPress={() => setShowModal(true)}
      >
        {defaultValue}
      </Text>

      {showModal && (
        <Modal
          animationType="slide"
          transparent
          presentationStyle="overFullScreen"
          onRequestClose={() => setShowModal(false)}
        >
          <View
            style={[
              createRouteStyles.largeModal,
              { alignItems: undefined, justifyContent: undefined },
            ]}
          >
            <Text style={listForm.fieldName}>Input an address or location</Text>
            <ScrollView keyboardShouldPersistTaps="always">
              <TextInput
                style={listForm.fieldAnswer}
                defaultValue={defaultValue}
                autoFocus
                onChangeText={(text) => search(text)}
              />

              {searchResult.map((result) => (
                <Pressable
                  key={result.properties.id}
                  style={{ borderBottomWidth: 1, paddingTop: 5 }}
                  onPress={() => {
                    changeLocation({
                      address: result.properties.label,
                      lon: result.geometry.coordinates[0],
                      lat: result.geometry.coordinates[1],
                    });
                    setShowModal(false);
                  }}
                >
                  <Text>{result.properties.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
}
