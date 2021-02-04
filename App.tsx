import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
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

                // You can return any component that you like here!
                return (
                  <MaterialCommunityIcons
                    name={iconName()}
                    size={size}
                    color={color}
                  />
                );
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
      </DatabaseContext.Provider>
    </ApolloProvider>
  );
}
