import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackParamList } from '../NavigationTypes';
import { RouteProp } from '@react-navigation/native';
import { basicColors, basicStyles } from '../styles/BasicColors';

interface CreateRouteScreenProps {
  navigation: BottomTabNavigationProp<StackParamList, 'Create route'>;
  route: RouteProp<StackParamList, 'Create route'>;
}

export default function CreateRouteScreen({
  navigation,
  route,
}: CreateRouteScreenProps) {
  return (
    <View
      style={{
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        height: '100%',
        marginTop: StatusBar.currentHeight,
        paddingHorizontal: 15,
        paddingTop: 25,
        backgroundColor: basicColors.topBarLight,
      }}
    >
      <View>
        <Text style={basicStyles.charcoalHeader}>Welcome</Text>
      </View>
      <View style={{ minHeight: 50 }} />
    </View>
  );
}
