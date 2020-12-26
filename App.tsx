import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons';
import {HomeScreen} from "./screens/HomeScreen";
import {BrowseScreen} from "./screens/BrowseScreen";
import {CurrentRouteScreen} from "./screens/CurrentRouteScreen";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";



const client = new ApolloClient({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    cache: new InMemoryCache()
});


const MainTab = createBottomTabNavigator();

export default function App() {
  return (
      <ApolloProvider client={client}>
          <NavigationContainer>
              <MainTab.Navigator
                  initialRouteName={"home"}
                  screenOptions={({ route }) => ({
                      tabBarIcon: ({ focused, color, size }) => {
                          let iconName: String = "ios-construct";

                          if (route.name === 'home') {
                              iconName = focused
                                  ? 'ios-information-circle'
                                  : 'ios-information-circle-outline';
                          } else if (route.name === 'browse') {
                              iconName = 'ios-list'
                          } else if (route.name === 'current route') {
                              iconName = "md-map"
                          }

                          // You can return any component that you like here!
                          return <Ionicons name={iconName} size={size} color={color} />;
                      },
                  })}
                  tabBarOptions={{
                      activeTintColor: 'tomato',
                      inactiveTintColor: 'gray'
                  }}>
                  <MainTab.Screen name={"browse"} component={BrowseScreen} />
                  <MainTab.Screen name={"home"} component={HomeScreen} />
                  <MainTab.Screen name={"current route"} component={CurrentRouteScreen} />
              </MainTab.Navigator>
          </NavigationContainer>
      </ApolloProvider>
  );
}
