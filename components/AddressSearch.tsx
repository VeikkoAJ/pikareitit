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
    <View style={[listForm.textInput, { flex: 1, flexWrap: 'wrap' }]}>
      {showModal && (
        <Modal
          animationType="slide"
          transparent
          presentationStyle="overFullScreen"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={createRouteStyles.largeModal}>
            <View
              style={[
                listForm.textInput,
                { flex: 1, flexWrap: 'wrap', margin: 10 },
              ]}
            >
              <Text style={listForm.fieldName}>
                Input an address or location
              </Text>
              <TextInput
                style={listForm.fieldAnswer}
                defaultValue={defaultValue}
                autoFocus
                onChangeText={(text) => search(text)}
              />
            </View>
            <ScrollView>
              {searchResult.map((result) => (
                <Pressable
                  key={result.properties.id}
                  style={{ borderBottomWidth: 1, paddingTop: 5 }}
                  onPress={() => {
                    changeLocation({
                      name: result.properties.label,
                      lat: result.geometry.coordinates[0],
                      lon: result.geometry.coordinates[1],
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
      <Text style={listForm.fieldName}>{name}</Text>
      <Text style={listForm.fieldAnswer} onPress={() => setShowModal(true)}>
        {defaultValue}
      </Text>
    </View>
  );
}
