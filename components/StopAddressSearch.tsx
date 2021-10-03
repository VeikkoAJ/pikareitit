import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
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
import StopAndStationOSMAndroid from './StopAndStationOSM.android';

interface AddressSearchProps {
  name: string;
  defaultValue: string;
  stops: StopsQueryData | undefined;
  stations: StationsQueryData | undefined;
  changeLocation: (location: MapLocation) => void;
}

export default function StopAddressSearch({
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
    if (searchWord === undefined || searchWord.length < 3) {
      return;
    }
    search(searchWord);
    if (stations !== undefined) {
      setFilteredStations(
        FindStation(stations.stations, searchWord.toLowerCase())
      );
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
      <Text style={[listForm.fieldAnswer, {}]}>{defaultValue}</Text>

      {showModal && (
        <Modal
          animationType="slide"
          transparent
          presentationStyle="overFullScreen"
          onRequestClose={() => setShowModal(false)}
        >
          <View
            style={{
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <KeyboardAvoidingView
              behavior="height"
              style={[createRouteStyles.fullScreeModal]}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[
                    listForm.fieldName,
                    { paddingTop: 16 / 6 + 8, paddingBottom: 5 },
                  ]}
                >
                  kirjoita pysäkin osoite tai aseman nimi
                </Text>
                <ListManipulationButton
                  buttonIcon="remove"
                  size={16}
                  color={routeLegColors.lightVisited}
                  onButtonPress={() => setShowModal(false)}
                />
              </View>
              <TextInput
                style={[
                  listForm.fieldAnswer,
                  {
                    marginLeft: 0,
                    marginBottom: 10,
                    minHeight: 20,
                    fontSize: 18,
                  },
                ]}
                placeholder={' esim. Rautatientori 2'}
                defaultValue={defaultValue}
                autoFocus
                onChangeText={(text) => {
                  setSearchWord(text);
                }}
              />
              <Text
                style={[
                  listForm.fieldAnswer,
                  {
                    fontWeight: 'bold',
                    marginLeft: 0,
                    borderBottomWidth: 0,
                    marginTop: 5,
                  },
                ]}
              >
                Pysäkit kartalla
              </Text>
              <StopAndStationOSM
                address={
                  searchResult[0] !== undefined
                    ? searchResult[0].properties.address
                    : undefined
                }
                lat={
                  searchResult[0] !== undefined
                    ? searchResult[0].geometry.coordinates[1]
                    : undefined
                }
                lon={
                  searchResult[0] !== undefined
                    ? searchResult[0].geometry.coordinates[0]
                    : undefined
                }
                stops={filteredStops}
                stations={filteredStations}
                markerDescriptionPress={changeLocation}
                closeModal={() => setShowModal(false)}
              />
              <ScrollView keyboardShouldPersistTaps="never">
                {searchResult.length > 0 && (
                  <Text
                    style={[
                      listForm.fieldAnswer,
                      {
                        fontWeight: 'bold',
                        marginLeft: 0,
                        borderBottomWidth: 0,
                        marginTop: 5,
                      },
                    ]}
                  >
                    Osoitteet
                  </Text>
                )}
                {searchResult.slice(0, 100).map((result) => (
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
                <View style={{ height: 20 }} />
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      )}
    </View>
  );
}

/*
{filteredStations.length > 0 && (
                  <Text
                    style={[
                      listForm.fieldAnswer,
                      {
                        fontWeight: 'bold',
                        marginLeft: 0,
                        borderBottomWidth: 0,
                        marginVertical: 5,
                      },
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
                      {
                        fontWeight: 'bold',
                        marginLeft: 0,
                        borderBottomWidth: 0,
                        marginTop: 5,
                      },
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
 */
