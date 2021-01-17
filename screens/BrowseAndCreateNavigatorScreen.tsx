import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { BrowseScreen } from './BrowseScreen';
import CreateRouteScreen from './CreateRouteScreen';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList, StackParamList } from '../NavigationTypes';

const Stack = createStackNavigator<StackParamList>();

interface BrowseAndCreateNavigatorScreenProps {
  navigation: BottomTabNavigationProp<RootTabParamList, 'Browse'>;
  route: RouteProp<RootTabParamList, 'Current route'>;
}

export default function BrowseAndCreateNavigatorScreen({
  navigation,
  route,
}: BrowseAndCreateNavigatorScreenProps) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Browse"
        component={BrowseScreen}
        initialParams={{ tabNavigationNavigate: navigation }}
      />
      <Stack.Screen
        name="Create route"
        component={CreateRouteScreen}
        initialParams={{ tabNavigationNavigate: navigation }}
      />
    </Stack.Navigator>
  );
}
