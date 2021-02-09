import React, { useState } from 'react';
import {
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { basicStyles, listStyles, Instructions } from '../styles/BasicStyles';
import ListManipulationButton from './ListManipulationButton';
import { basicColors } from '../styles/BasicColors';
import InstructionsPage1 from './InstructionsPage1';
import InstructionsPage2 from './InstructionsPage2';

// TODO move styles to BasicStyles

interface InstructionsModalProps {
  closeModal: () => void;
}

const lastPageIndex = 1;

export default function InstructionsModal({
  closeModal,
}: InstructionsModalProps) {
  const [page, setPage] = useState(0);

  const showPage = (pageNumber: number) => {
    switch (pageNumber) {
      case 0:
        return <InstructionsPage1 />;
      case 1:
        return <InstructionsPage2 />;
      default:
        return (
          <View style={{ justifyContent: 'center' }}>
            <Text>Jotain meni pieleen :/</Text>
          </View>
        );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      presentationStyle="fullScreen"
      onRequestClose={() => closeModal}
    >
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
        {showPage(page)}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={[
              listStyles.container,
              {
                flex: 1,
                justifyContent: 'center',
                paddingTop: 7,
                paddingBottom: 6,
              },
            ]}
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
            <Text
              style={[
                Instructions.subHeader,
                {
                  textAlign: 'center',
                  textAlignVertical: 'bottom',
                  color: 'white',
                  fontSize: 22,
                },
              ]}
            >
              {page === 0 ? 'Poistu' : `Edellinen`}
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 0.1 }} />
          <TouchableOpacity
            style={[
              listStyles.container,
              {
                flex: 1,
                justifyContent: 'center',
                paddingTop: 7,
                paddingBottom: 6,
              },
            ]}
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
            <Text
              style={[
                Instructions.subHeader,
                {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: 'white',
                  fontSize: 22,
                },
              ]}
            >
              {page === lastPageIndex ? 'Sulje' : `Seuraava`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
