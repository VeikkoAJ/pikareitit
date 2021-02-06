import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Instructions, listStyles } from '../styles/BasicStyles';
import { basicColors } from '../styles/BasicColors';

export default function InstructionsPage2() {
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
      <Text style={Instructions.subHeader}>Reitin luominen</Text>
      <Text style={Instructions.text}>
        - Reittejä voi luoda itse lisää reitti napista.
      </Text>
      <Text style={Instructions.text}>
        -Tallentttuja reittejä on myös mahdollista muokata selaa reittejä
        -välilehdellä
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingVertical: 4,
          minHeight: '5%',
        }}
      >
        <View style={{ flex: 1.5 }}>
          <Image
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              resizeMode: 'contain',
              borderRadius: 15,
            }}
            source={require('../assets/routeLegCreation.jpg')}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 8 }}>
          <Text style={Instructions.text}>
            {
              '- Aseta alku- ja loppupisteiksi yhden etapin pysäkit\n - toinen määränpää on saman linjan toinen pysäkki\n'
            }
          </Text>
        </View>
      </View>

      <Text style={Instructions.text}>
        {
          '- Kuljetusvälinenapeista on mahdollista valita etapissa haettavat liikennevälineet'
        }
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingVertical: 4,
        }}
      >
        <Image
          style={{
            flex: 1.5,
            height: 180,
            resizeMode: 'center',
            borderRadius: 15,
          }}
          source={require('../assets/dualRouteLegCreation.jpg')}
        />

        <View style={{ flex: 1, paddingLeft: 8 }}>
          <Text style={Instructions.text}>
            {
              '- Samanaikaisia etappeja voi luoda painamalla etappia pohjaan pitkään, joka avaa lisävalikon'
            }
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 4,
          borderTopWidth: 1,
        }}
      />
      <Text style={Instructions.subHeader}>Reitin lisätiedot</Text>
      <Text style={Instructions.text}>
        {'- Reitin alku- ja loppupisteet kertovat mistä, mihin reitti menee'}
      </Text>
      <Text style={Instructions.text}>
        {'- Alkumatkan pituuden asettamalla voi myöhäistää reitin alkua ottamalla huomioon esimerkiksi kävelymatkan ensimmäiselle' +
          ' pysäkille. '}
      </Text>
      <View
        style={{
          height: 30,
        }}
      />
    </ScrollView>
  );
}
