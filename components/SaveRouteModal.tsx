import React, { useContext, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Route, RouteTransportLegRow } from '../types';
import { basicStyles, listStyles, routeLegColors } from '../styles/BasicColors';
import { TextInputBar } from './TextInputBar';

import { DatabaseContext } from '../hooks/UseRouteDatabase';

interface SaveRouteModalProps {
  routeTransportLegRows: RouteTransportLegRow[];
  closeModal: () => void;
}

export default function SaveRouteModal({
  routeTransportLegRows,
  closeModal,
}: SaveRouteModalProps) {
  const [route, setRoute] = useState<Route>({
    routeName: '',
    description: '',
    originPlace: '',
    finalDestination: '',
    startWalkDuration: 0,
    routeTransportLegRows,
  });
  const useRouteDatabase = useContext(DatabaseContext);
  const saveRoute = async () => {
    try {
      const routeId = `user${route.routeName}Route`;
      useRouteDatabase?.setRoute(routeId, route);
      console.log(route);
    } catch (e) {
      console.log('saving failed', e);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      presentationStyle="fullScreen"
      onRequestClose={() => closeModal()}
    >
      <View style={basicStyles.background}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={basicStyles.charcoalHeader}>Save The Route</Text>
        </View>
        <View style={{ minHeight: 30 }} />
        <View
          style={[
            listStyles.listContainer,
            {
              flex: 1,
              justifyContent: 'space-between',
              paddingVertical: 0,
              paddingBottom: 0,
              marginBottom: 50,
            },
          ]}
        >
          <TextInputBar
            text="Name of the Route"
            answer={route.routeName}
            setAnswer={(answer: string) =>
              setRoute({ ...route, routeName: answer })
            }
          />
          <TextInputBar
            text="description"
            answer={route.description}
            setAnswer={(answer: string) =>
              setRoute({ ...route, description: answer })
            }
          />
          <TextInputBar
            text="Starting place name (eg. home, work)"
            answer={route.originPlace}
            setAnswer={(answer: string) =>
              setRoute({ ...route, originPlace: answer })
            }
          />
          <TextInputBar
            text="Destination name"
            answer={route.finalDestination}
            setAnswer={(answer: string) =>
              setRoute({ ...route, finalDestination: answer })
            }
          />
          <TextInputBar
            text="Start walk time eg. from home door to bus stop"
            flexRate={2}
            keyboardType="decimal-pad"
            answer={route.startWalkDuration.toString(10)}
            setAnswer={(answer: string) =>
              setRoute({ ...route, startWalkDuration: parseInt(answer, 10) })
            }
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{
                flex: 3,
                alignItems: 'center',
                padding: 10,
                borderRadius: 10,
                backgroundColor: routeLegColors.light,
              }}
              onPress={() => closeModal()}
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
                saveRoute();
                closeModal();
              }}
            >
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
