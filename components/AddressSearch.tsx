import React, { useEffect, useState } from 'react';
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
import UseAddressSearch from '../hooks/UseAddressSearch';
import { MapLocation } from '../types';
import ListManipulationButton from './ListManipulationButton';
import { listForm } from '../styles/BasicStyles';
import {
  Station,
  StationsQueryData,
  StopsQueryData,
} from '../transitStopsQueryTypes';
import { FindNearestStops, FindStation } from '../services/FindStation';

interface AddressSearchProps {
  name: string;
  defaultValue: string;
  stops: StopsQueryData | undefined;
  stations: StationsQueryData | undefined;
  changeLocation: (location: MapLocation) => void;
}

export default function AddressSearch({
  name,
  defaultValue,
  stops,
  stations,
  changeLocation,
}: AddressSearchProps) {
  const [showModal, setShowModal] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const { searchResult, search } = UseAddressSearch();
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);
  const [filteredStops, setFilteredStops] = useState<Station[]>([]);

  useEffect(() => {
    if (searchWord.length < 3) {
      return;
    }
    search(searchWord);
    if (stations !== undefined) {
      setFilteredStations(FindStation(stations.stations, searchWord));
    }
  }, [searchWord]);

  useEffect(() => {
    if (
      stops !== undefined &&
      searchResult.length > 0 &&
      searchResult[0] !== undefined
    ) {
      setFilteredStops(
        FindNearestStops(
          stops.stops,
          searchResult[0].geometry.coordinates[1],
          searchResult[0].geometry.coordinates[0]
        )
      );
    }
  }, [searchResult]);

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
                style={[
                  listForm.fieldAnswer,
                  { alignSelf: 'stretch', marginLeft: 0 },
                ]}
                placeholder=" esim. Rautatientori 2 "
                defaultValue={defaultValue}
                autoFocus
                onChangeText={(text) => {
                  setSearchWord(text);
                }}
              />
              {filteredStations.length > 0 && (
                <Text
                  style={[
                    listForm.fieldAnswer,
                    { fontWeight: 'bold', marginLeft: 0, borderBottomWidth: 0 },
                  ]}
                >
                  Asemat
                </Text>
              )}
              {filteredStations.length > 0 &&
                filteredStations.map((station) => (
                  <Pressable
                    key={station.gtfsId}
                    style={{ borderBottomWidth: 1, paddingTop: 5 }}
                    onPress={() => {
                      changeLocation({
                        address: station.name,
                        lon: station.lon,
                        lat: station.lat,
                      });
                      setShowModal(false);
                    }}
                  >
                    <Text>{station.name}</Text>
                  </Pressable>
                ))}
              {filteredStops.length > 0 && (
                <Text
                  style={[
                    listForm.fieldAnswer,
                    { fontWeight: 'bold', marginLeft: 0, borderBottomWidth: 0 },
                  ]}
                >
                  Pysäkit
                </Text>
              )}
              {filteredStops.length > 0 &&
                filteredStops.map((stop) => (
                  <Pressable
                    key={stop.gtfsId}
                    style={{ borderBottomWidth: 1, paddingTop: 5 }}
                    onPress={() => {
                      changeLocation({
                        address: stop.name,
                        lon: stop.lon,
                        lat: stop.lat,
                      });
                      setShowModal(false);
                    }}
                  >
                    <Text>{stop.name}</Text>
                  </Pressable>
                ))}
              {searchResult.length > 0 && (
                <Text
                  style={[
                    listForm.fieldAnswer,
                    { fontWeight: 'bold', marginLeft: 0, borderBottomWidth: 0 },
                  ]}
                >
                  Osoitteet
                </Text>
              )}
              {searchResult.slice(0, 5).map((result) => (
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
