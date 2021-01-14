import { routeLegColors } from '../styles/BasicColors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import React from 'react';

interface AddRemoveButtonProps {
  addRemove: 'add' | 'remove';
  size: number;
  color: string;
  secondaryColor?: string;
  onButtonPress: () => void;
}

export function AddRemoveButton({
  addRemove,
  size,
  color,
  secondaryColor,
  onButtonPress,
}: AddRemoveButtonProps) {
  const name = () => {
    if (addRemove === 'add') {
      return 'plus';
    }
    return 'close';
  };

  return (
    <TouchableOpacity
      style={{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: size / 6,
        borderRadius: size * 1.25,
        backgroundColor: color,
        elevation: 2,
      }}
      onPress={onButtonPress}
    >
      <MaterialCommunityIcons
        name={name()}
        size={size}
        color={secondaryColor || 'white'}
      />
    </TouchableOpacity>
  );
}
