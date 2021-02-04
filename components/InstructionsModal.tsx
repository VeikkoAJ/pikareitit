import React, { useState } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { basicStyles, listStyles } from '../styles/BasicStyles';
import ListManipulationButton from './ListManipulationButton';
import { basicColors, routeLegColors } from '../styles/BasicColors';

// TODO move styles to BasicStyles
const textStyle = StyleSheet.create({
  header: {
    flexShrink: 1,
    fontSize: 24,
    color: routeLegColors.charCoalText,
  },
  subHeader: {
    flexShrink: 1,
    fontSize: 20,
    color: 'black',
  },
  text: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 16,
    color: 'black',
  },
});

interface InstructionsModalProps {
  closeModal: () => void;
}

const lastPageIndex = 1;

export default function InstructionsModal({
  closeModal,
}: InstructionsModalProps) {
  const [page, setPage] = useState(0);
  return (
    <Modal onRequestClose={() => closeModal}>
      <View style={[basicStyles.base, { marginTop: 0 }]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={[basicStyles.charcoalHeader, { textAlignVertical: 'top' }]}
          >
            Ohjeet
          </Text>
          <ListManipulationButton
            buttonIcon="remove"
            size={28}
            color={basicColors.topBarBackground}
            onButtonPress={closeModal}
          />
        </View>
        <View
          style={[
            listStyles.container,
            {
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              backgroundColor: basicColors.topBarLight,
              elevation: 0,
            },
          ]}
        >
          {page === 0 && (
            <>
              <Text style={textStyle.subHeader}>Aikataulun solmut</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingVertical: 4,
                }}
              >
                <View style={{ flex: 1.5 }}>
                  <Image
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                      resizeMode: 'contain',
                      borderRadius: 5,
                    }}
                    source={require('../assets/routeLeg.jpg')}
                  />
                </View>
                <View style={{ flex: 1, paddingLeft: 8 }}>
                  <Text style={textStyle.text}>
                    - Yhdessä taulussa on pysäkin seuraavat kolme lähtevää
                    linjaa ja niiden saapumisajat seuraavalle pysäkille.
                  </Text>
                </View>
              </View>
              <Text style={textStyle.text}>
                - Pitkä painallus vaihtaa nykyisen pysäkin reitin alkupisteeksi
                ja hakee uudet aikataulut nykyisen ajan mukaan.
              </Text>
              <Text style={textStyle.text}>
                <Text>
                  {
                    '- Lyhyt painallus näyttää lisätietoja linjoista, kuten laiturin ja '
                  }
                </Text>
                <Text style={{ color: 'grey' }}>
                  aikataulun reaaliaikaisuuden (ominaisuus tulossa)
                </Text>
              </Text>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 4,
                  borderTopWidth: 1,
                }}
              />
              <Text style={textStyle.subHeader}>Yläpalkin kello</Text>
              <View
                style={{
                  marginVertical: 4,
                  minHeight: '5%',
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    resizeMode: 'contain',
                    borderRadius: 5,
                  }}
                  source={require('../assets/topBar.jpg')}
                />
              </View>
              <Text style={textStyle.text}>
                - Yläpalkin kellosta on mahdollista siirtää reittien hakuaikaa
                tulevaisuuteen tai menneisyyteen
              </Text>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 4,
                  borderTopWidth: 1,
                }}
              />
              <Text style={textStyle.subHeader}>Reittipisteet</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingVertical: 4,
                }}
              >
                <View style={{ flex: 1.5 }}>
                  <Image
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                      resizeMode: 'contain',
                      borderRadius: 5,
                    }}
                    source={require('../assets/middleSector.jpg')}
                  />
                </View>
                <View style={{ flex: 1, paddingLeft: 8 }}>
                  <Text style={textStyle.text}>
                    - Reittipisteet näyttävät matkustusajan seuraavaalle
                    pysäkille
                  </Text>
                </View>
              </View>
            </>
          )}
          {page === 1 && (
            <>
              <Text style={textStyle.subHeader}>Reitin luominen</Text>
              <Text style={textStyle.text}>
                Omien reittien luominen onnistuu kätevästi
              </Text>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 4,
                  borderTopWidth: 1,
                }}
              />
              <View
                style={{
                  marginVertical: 4,
                  minHeight: '5%',
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    resizeMode: 'contain',
                    borderRadius: 5,
                  }}
                  source={require('../assets/routeLegCreation.jpg')}
                />
              </View>
            </>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 25,
            }}
          >
            <TouchableOpacity
              style={[listStyles.container, { flex: 1 }]}
              onPress={() => {
                if (page > 0) {
                  setPage(page - 1);
                  return;
                }
                if (page === 0) {
                  closeModal();
                }
              }}
            >
              <Text style={[textStyle.subHeader, { textAlign: 'center' }]}>
                {page === 0 ? 'sulje' : 'edellinen sivu'}
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 0.1 }} />
            <TouchableOpacity
              style={[listStyles.container, { flex: 1 }]}
              onPress={() => {
                if (page < lastPageIndex) {
                  setPage(page + 1);
                  return;
                }
                if (page === 1) {
                  closeModal();
                }
              }}
            >
              <Text style={[textStyle.subHeader, { textAlign: 'center' }]}>
                {page === lastPageIndex ? 'sulje' : 'seuraava sivu'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
