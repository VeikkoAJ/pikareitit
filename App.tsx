import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootTabParamList } from './navigationTypes';
import HomeScreen from './screens/HomeScreen';
import CurrentRouteScreen from './screens/CurrentRouteScreen';
import { basicColors, routeLegColors } from './styles/BasicColors';
import BrowseAndCreateNavigatorScreen from './screens/BrowseAndCreateNavigatorScreen';
import UseRouteDatabase from './hooks/UseRouteDatabase';
import { DatabaseContext } from './contextTypes';

interface tabBarIcon {
  focused: boolean;
  color: string;
  size: number;
}

const client = new ApolloClient({
  uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
  cache: new InMemoryCache(),
});

const MainTab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const { setExampleRoute, databaseContextValues } = UseRouteDatabase();

  setExampleRoute();

  return (
    <ApolloProvider client={client}>
      <DatabaseContext.Provider value={databaseContextValues}>
        <NavigationContainer>
          <MainTab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }: tabBarIcon) => {
                const iconName = () => {
                  if (route.name === 'Home') {
                    return focused ? 'home' : 'home-outline';
                  }
                  if (route.name === 'Browse') {
                    return 'menu';
                  }
                  if (route.name === 'Current route') {
                    return focused ? 'compass' : 'compass-outline';
                  }
                  return 'alert';
                };
                const iconText = () => {
                  switch (route.name) {
                    case 'Browse':
                      return 'Selaa';
                    case 'Home':
                      return 'Koti';
                    case 'Current route':
                      return 'Reitti';
                    default:
                      return 'Missing text';
                  }
                };
                return (
                  <View>
                    <MaterialCommunityIcons
                      style={{ alignSelf: 'center' }}
                      name={iconName()}
                      size={size}
                      color={color}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: focused ? routeLegColors.normal : 'white',
                        textAlign: 'center',
                      }}
                    >
                      {iconText()}
                    </Text>
                  </View>
                );
              },
            })}
            tabBarOptions={{
              style: {
                backgroundColor: basicColors.background,
              },
              activeTintColor: routeLegColors.normal,
              inactiveTintColor: 'white',
              showLabel: false,
              keyboardHidesTabBar: true,
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
      </DatabaseContext.Provider>
    </ApolloProvider>
  );
}
