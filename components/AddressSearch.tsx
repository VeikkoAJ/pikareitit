import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { routeLegColors } from '../styles/BasicColors';
import { createRouteStyles } from '../styles/CreateRouteStyles';
import { UseAddressSearch } from '../hooks/UseAddressSearch';
import { MapLocation } from '../types';
import { ListManipulationButton } from './ListManipulationButton';
import { listForm } from '../styles/BasicStyles';

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
          <View style={[createRouteStyles.largeModal, {}]}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[listForm.fieldName, { paddingTop: 16 / 6 + 8 }]}>
                kirjoita osoite tai paikan nimi
              </Text>
              <ListManipulationButton
                buttonIcon="remove"
                size={16}
                color={routeLegColors.lightVisited}
                onButtonPress={() => setShowModal(false)}
              />
            </View>

            <ScrollView
              style={{ alignSelf: 'stretch' }}
              keyboardShouldPersistTaps="always"
            >
              <TextInput
                style={[listForm.fieldAnswer, { alignSelf: 'stretch' }]}
                placeholder=" esim. Rautatientori 2 "
                defaultValue={defaultValue}
                autoFocus
                onChangeText={(text) => search(text)}
                onSubmitEditing={() => {
                  if (searchResult.length > 0) {
                    changeLocation({
                      address: searchResult[0].properties.label,
                      lon: searchResult[0].geometry.coordinates[0],
                      lat: searchResult[0].geometry.coordinates[1],
                    });
                    setShowModal(false);
                  }
                }}
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
