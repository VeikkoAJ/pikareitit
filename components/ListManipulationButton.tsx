import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { basicColors } from '../styles/BasicColors';

type listManipulationButtonProps = {
  buttonIcon: 'add' | 'remove' | 'moveUp' | 'moveDown' | 'info' | 'edit';
  size: number;
  color: string;
  secondaryColor?: string | undefined;
  onButtonPress: () => void;
};

export default function ListManipulationButton({
  buttonIcon,
  size,
  color,
  secondaryColor = undefined,
  onButtonPress,
}: listManipulationButtonProps) {
  const iconName = () => {
    switch (buttonIcon) {
      case 'add':
        return 'plus';
      case 'remove':
        return 'close';
      case 'moveUp':
        return 'arrow-up';
      case 'moveDown':
        return 'arrow-down';
      case 'info':
        return 'information-outline';
      case 'edit':
        return 'square-edit-outline';
      default:
        return 'walk';
    }
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
        backgroundColor: basicColors.secondary,
        elevation: 2,
      }}
      onPress={onButtonPress}
    >
      <MaterialCommunityIcons
        name={iconName()}
        size={size}
        color={secondaryColor || 'white'}
      />
    </TouchableOpacity>
  );
}
