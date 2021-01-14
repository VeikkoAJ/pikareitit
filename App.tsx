import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RootTabParamList } from './NavigationTypes';
import { HomeScreen } from './screens/HomeScreen';
import { BrowseScreen } from './screens/BrowseScreen';
import { CurrentRouteScreen } from './screens/CurrentRouteScreen';
import { basicColors, routeLegColors } from './styles/BasicColors';
import BrowseAndCreateNavigatorScreen from './screens/BrowseAndCreateNavigatorScreen';

const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  cache: new InMemoryCache(),
});

const MainTab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainTab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = 'ios-construct';
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Browse') {
                iconName = 'ios-list';
              } else if (route.name === 'Current route') {
                iconName = 'md-map';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            style: {
              backgroundColor: basicColors.topBarBackground,
            },
            activeTintColor: routeLegColors.normal,
            inactiveTintColor: 'white',
          }}
        >
          <MainTab.Screen
            name="Browse"
            component={BrowseAndCreateNavigatorScreen}
          />
          <MainTab.Screen name="Home" component={HomeScreen} />
          <MainTab.Screen
            name="Current route"
            component={CurrentRouteScreen}
            initialParams={{ routeKey: undefined }}
          />
        </MainTab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
