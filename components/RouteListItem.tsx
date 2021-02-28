import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { routeLegColors } from '../styles/BasicColors';
import DeleteRouteModal from './DeleteRouteModal';
import ListManipulationButton from './ListManipulationButton';
import { listStyles } from '../styles/BasicStyles';

interface RouteNameListProps {
  name: string;
  originPlace: string;
  finalDestination: string;
  setActiveRoute: () => void;
  editRoute: () => void;
  deleteRoute: () => void;
}

export default function RouteListItem({
  name,
  originPlace,
  finalDestination,
  setActiveRoute,
  editRoute,
  deleteRoute,
}: RouteNameListProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <TouchableOpacity
      style={[
        listStyles.item,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 0,
        },
      ]}
      onPress={() => setActiveRoute()}
    >
      {showDeleteModal && (
        <DeleteRouteModal
          routeName={name}
          deleteRoute={() => deleteRoute()}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}
      <View style={{ flex: 4 }}>
        <Text style={[listStyles.itemHeader, { borderBottomWidth: 0 }]}>
          {name}
        </Text>
        <Text
          style={{ flexWrap: 'wrap' }}
        >{`${originPlace} -> ${finalDestination}`}</Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row-reverse', flexWrap: 'wrap' }}>
        <ListManipulationButton
          buttonIcon="edit"
          size={20}
          color={routeLegColors.light}
          onButtonPress={() => editRoute()}
        />
        <ListManipulationButton
          buttonIcon="remove"
          size={20}
          color={routeLegColors.light}
          onButtonPress={() => setShowDeleteModal(true)}
        />
      </View>
    </TouchableOpacity>
  );
}
