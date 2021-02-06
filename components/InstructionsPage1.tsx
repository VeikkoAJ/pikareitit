import React from 'react';
import { Instructions, listStyles } from '../styles/BasicStyles';
import { basicColors } from '../styles/BasicColors';
import { Image, ScrollView, Text, View } from 'react-native';

export default function InstructionsPage1() {
  return (
    <ScrollView
      style={[
        listStyles.container,
        {
          backgroundColor: basicColors.topBarLight,
          elevation: 1,
        },
      ]}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Text style={Instructions.subHeader}>Aikataulun solmut</Text>
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
          <Text style={Instructions.text}>
            Yhdessä taulussa on pysäkin seuraavat kolme lähtevää linjaa ja
            niiden saapumisajat seuraavalle pysäkille.
          </Text>
        </View>
      </View>
      <Text style={Instructions.text}>
        Pitkä painallus vaihtaa nykyisen pysäkin reitin alkupisteeksi ja hakee
        uudet aikataulut nykyisen ajan mukaan.
      </Text>
      <Text style={Instructions.text}>
        <Text>
          {'Lyhyt painallus näyttää lisätietoja linjoista, kuten laiturin ja '}
        </Text>
        <Text style={{ color: 'gray' }}>
          aikataulun reaaliaikaisuuden (ominaisuus tulossa).
        </Text>
      </Text>
      <View
        style={{
          marginTop: 10,
          marginBottom: 4,
          borderTopWidth: 1,
        }}
      />
      <Text style={Instructions.subHeader}>Yläpalkin kello</Text>
      <View
        style={{
          marginVertical: 4,
          alignSelf: 'flex-start',
          minWidth: '80%',
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
      <Text style={Instructions.text}>
        Yläpalkin kellosta on mahdollista siirtää reittien hakuaikaa
        tulevaisuuteen tai menneisyyteen.
      </Text>
      <View
        style={{
          marginTop: 10,
          marginBottom: 4,
          borderTopWidth: 1,
        }}
      />
      <Text style={Instructions.subHeader}>Reittipisteet</Text>
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
          <Text style={Instructions.text}>
            Reittipisteet näyttävät matkustusajan seuraavaalle pysäkille.
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 30,
        }}
      />
    </ScrollView>
  );
}
