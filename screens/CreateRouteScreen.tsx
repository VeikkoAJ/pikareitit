import React from 'react';
import { ScrollView, StatusBar, Text, TextInput, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackParamList } from '../NavigationTypes';
import { RouteProp } from '@react-navigation/native';
import {
  basicColors,
  basicStyles,
  listForm,
  listStyles,
  routeLegColors,
} from '../styles/BasicColors';
import { RouteLegCreation } from '../components/RouteLegCreation';

interface CreateRouteScreenProps {
  navigation: BottomTabNavigationProp<StackParamList, 'Create route'>;
  route: RouteProp<StackParamList, 'Create route'>;
}

export default function CreateRouteScreen({
  navigation,
  route,
}: CreateRouteScreenProps) {
  return (
    <View style={basicStyles.background}>
      <View>
        <Text style={basicStyles.charcoalHeader}>Create a new route</Text>
      </View>
      <View style={{ minHeight: 30 }} />
      <RouteLegCreation />
    </View>
  );
}
