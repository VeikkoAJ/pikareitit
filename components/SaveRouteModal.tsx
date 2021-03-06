import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Route, RouteTransportLegRow } from '../types';
import { routeLegColors } from '../styles/BasicColors';
import { TextInputBar } from './TextInputBar';

import { DatabaseContext } from '../contextTypes';
import { basicStyles, listStyles } from '../styles/BasicStyles';
import { createRouteStyles } from '../styles/CreateRouteStyles';

type RouteInfo =
  | {
      routeName: string;
      description: string;
      originPlace: string;
      finalDestination: string;
      startWalkDuration: number;
    }
  | undefined;

interface SaveRouteModalProps {
  routeTransportLegRows: RouteTransportLegRow[];
  routeInfo: RouteInfo;
  routeId: string | undefined;
  routeRev: string | undefined;
  closeModal: (saved: boolean) => void;
}

export default function SaveRouteModal({
  routeTransportLegRows,
  routeInfo,
  routeId,
  routeRev,
  closeModal,
}: SaveRouteModalProps) {
  const [route, setRoute] = useState<Route>(
    routeInfo !== undefined
      ? {
          ...routeInfo,
          routeTransportLegRows,
        }
      : {
          routeTransportLegRows,
          routeName: '',
          description: '',
          originPlace: routeTransportLegRows[0].routeLegs[0].from.address,
          finalDestination:
            routeTransportLegRows[0].routeLegs[
              routeTransportLegRows[0].routeLegs.length - 1
            ].to.address,
          startWalkDuration: 0,
        }
  );
  const useRouteDatabase = useContext(DatabaseContext);
  const saveRoute = async () => {
    try {
      const id =
        routeId !== undefined ? routeId : `user${route.routeName}Route`;
      useRouteDatabase?.setRoute(id, routeRev, route);
    } catch (e) {
      console.log('saving failed', e);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      presentationStyle="fullScreen"
      onRequestClose={() => closeModal(false)}
    >
      <View
        style={{
          height: '100%',
          backgroundColor: 'rgba(68, 98, 76, 0.9)',
        }}
      >
        <KeyboardAvoidingView style={[createRouteStyles.fullScreeModal]}>
          <ScrollView
            style={[
              {
                paddingVertical: 0,
                paddingBottom: 0,
                marginBottom: 10,
              },
            ]}
          >
            <Text style={[basicStyles.charcoalHeader, { marginBottom: 10 }]}>
              Tallenna reitti
            </Text>
            <TextInputBar
              text="Reitin nimi"
              answer={route.routeName}
              setAnswer={(answer: string) =>
                setRoute({ ...route, routeName: answer })
              }
            />
            <TextInputBar
              text="Reitin kuvaus"
              answer={route.description}
              setAnswer={(answer: string) =>
                setRoute({ ...route, description: answer })
              }
            />
            <TextInputBar
              text="Aloituspaikan nimi"
              answer={route.originPlace}
              setAnswer={(answer: string) =>
                setRoute({ ...route, originPlace: answer })
              }
            />
            <TextInputBar
              text="Määränpään nimi"
              answer={route.finalDestination}
              setAnswer={(answer: string) =>
                setRoute({ ...route, finalDestination: answer })
              }
            />
            <TextInputBar
              text="aloituspaikan ja pysäkin väliseen matkaan kuluva aika (min), vapaaehtoinen"
              flexRate={2}
              keyboardType="decimal-pad"
              answer={
                route.startWalkDuration !== 0
                  ? route.startWalkDuration.toString(10)
                  : ''
              }
              setAnswer={(answer: string) => {
                if (answer.length > 0) {
                  setRoute({
                    ...route,
                    startWalkDuration: parseInt(answer, 10),
                  });
                  return;
                }
                setRoute({ ...route, startWalkDuration: 0 });
              }}
            />
            <View style={{ marginVertical: 10, flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  flex: 3,
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: routeLegColors.light,
                }}
                onPress={() => closeModal(false)}
              >
                <Text>Close</Text>
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
                onPress={() => {
                  if (route.routeTransportLegRows.length === 0) {
                    ToastAndroid.show(
                      'Reitti ei voi olla tyhjä!',
                      ToastAndroid.LONG
                    );
                    closeModal(false);
                    return;
                  }
                  if (route.routeName.length < 2) {
                    ToastAndroid.show(
                      'Reitiltä puuttuu nimi tai sen nimi on liian lyhyt!',
                      ToastAndroid.SHORT
                    );
                    return;
                  }

                  saveRoute();
                  closeModal(true);
                }}
              >
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
