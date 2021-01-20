import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { listStyles, routeLegColors } from '../styles/BasicColors';
import DeleteRouteModal from './DeleteRouteModal';
import { ListManipulationButton } from './ListManipulationButton';

interface RouteNameListProps {
  name: string;
  originPlace: string;
  finalDestination: string;
  setActiveRoute: () => void;
  deleteRoute: () => void;
}

export function RouteNameList({
  name,
  originPlace,
  finalDestination,
  setActiveRoute,
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
      <View>
        <Text style={[listStyles.itemHeader, { borderBottomWidth: 0 }]}>
          {name}
        </Text>
        <Text style={{}}>{`${originPlace} -> ${finalDestination}`}</Text>
      </View>
      <ListManipulationButton
        buttonIcon="remove"
        size={24}
        color={routeLegColors.light}
        onButtonPress={() => setShowDeleteModal(true)}
      />
    </TouchableOpacity>
  );
}
