import React, {useEffect, useState} from 'react';
import {Button, FlatList, StatusBar, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Route} from '../types';
import {RouteNameList} from '../components/RouteNameList';
import {basicColors} from '../styles/BasicColors';
import {RootTabParamList} from '../NavigationTypes';

const testRoute: Route = {
    routeName: 'Majurinkulma -> Lehmustie',
    description: 'there is no description to this cursed shit',
    originPlace: 'Majurinkulma',
    finalDestination: 'Lehmustie',
    startWalkDuration: 2.3 * 60,
    routeTransportLegRows: [
        {
            routeLegs: [
                {
                    from: 'Majurinkulma 2, Espoo::60.2112299,24.8230712',
                    to: 'Leppävaaran asema, Espoo::60.2193775,24.8113851',
                    transportModes: [{ mode: 'BUS' }, { mode: 'WALK' }],
                },
            ],
            middleSector: 'single',
            middleSectorTransportModes: [{ mode: 'BUS' }],
        },
        {
            routeLegs: [
                {
                    from: 'Leppävaaran asema, Espoo::60.2193775,24.8113851',
                    to: 'Pasilan asema, Helsinki, Helsinki::60.1986935,24.9345064',
                    transportModes: [{ mode: 'RAIL' }],
                }
            ],
            middleSector: 'single',
            middleSectorTransportModes: [{ mode: 'RAIL' }],
        },
        {
            routeLegs: [
                {
                    from: 'Pasilan asema, Helsinki::60.1986935,24.9345064',
                    to: 'Pukinmäen asema, Helsinki::60.2424651,24.9917559',
                    secondaryTo: 'Malmin asema, Helsinki::60.2506078,25.0094086',
                    transportModes: [{ mode: 'RAIL' }],
                },
            ],
            middleSector: 'split',
            middleSectorTransportModes: [{ mode: 'RAIL' }],
        },
        {
            routeLegs: [
                {
                    from: 'Pukinmäen asema, Helsinki::60.2424651,24.9917559',
                    to: 'Syystie 19, Helsinki::60.2567313,24.9973389',
                    transportModes: [{ mode: 'BUS' }],
                },
                {
                    from: 'Malmin asema, Helsinki::60.2506078,25.0094086',
                    to: 'Syystie 19, Helsinki::60.2567313,24.9973389',
                    transportModes: [{ mode: 'BUS' }],
                }
            ],
            middleSector: 'merge',
            middleSectorTransportModes: [{ mode: 'BUS' }],
        },
    ],
}
// TODO move this to types after async storage is working
interface RouteKeyPair {
    route: Route,
    key: string
}

export function HomeScreen({ navigation }) {

    const [routeKeys, setRouteKeys] = useState<string[]>([]);
    const [routes, setRoutes] = useState<RouteKeyPair[]>([])
    const [activeRouteKey, setActiveRouteKey] = useState<string | undefined>(undefined)
    const [tempToggle, setTempToggle] = useState(false) // this is for testing useEffect

    useEffect(() => {
        console.log('triggered')
        async function getRouteKeys() {
            try {
                const keys = await AsyncStorage.getAllKeys()
                console.log('keys', keys)
                if (keys !== undefined) {
                    setRouteKeys(keys);
                    const fetchedRoutes = await AsyncStorage.multiGet(keys)
                    if (fetchedRoutes !== undefined) {
                        // @ts-ignore
                        // TODO fix mapping
                        setRoutes(fetchedRoutes.map(route => {
                            if (route[1] !== null && route[1][0] === '{') {
                                console.log('route', route);
                                return ({
                                    route: JSON.parse(route[1]),
                                    key: route[0]
                                })
                            }
                            return undefined
                        }).filter( _ => _ !== undefined))
                    }
                }
            } catch (e) {
                console.log("error fetching routes from async storage", e)
            }
        }
        getRouteKeys()
    }, [tempToggle])

    const loadActiveRoute = (routeKey: string) => {
        setActiveRouteKey(routeKey);
        navigation.navigate( 'Current route', {
            routeKey
        })

    }

    const storeRoute = async (route: Route) => {
        try {
            const jsonRoute = JSON.stringify(route)
            await AsyncStorage.setItem('testKey', jsonRoute)
        } catch (e) {
            console.log("failed to save route:", e)
        }
    }

    console.log('routes:', routes);


    // TODO add top bar
    return (
        <View style={{
            marginTop: StatusBar.currentHeight,
            backgroundColor: basicColors.topBarLight
        }}>
            <FlatList
              style={{
                  borderWidth: 1,
                  minHeight: 300,
                  flex: 1
              }}
              data={routes}
              renderItem={({item}) => (
                <RouteNameList
                  name={item.route.routeName}
                  originPlace={item.route.originPlace}
                  finalDestination={item.route.finalDestination}
                  setActiveRoute={() => loadActiveRoute(item.key)}
                />
              )}
              ItemSeparatorComponent={() => (
                <View style={{borderBottomWidth: 1, borderColor: 'black', minHeight: 1}}/>
              )}
              keyExtractor={_ => _.key}
            />
            <Button title='save' onPress={() => storeRoute(testRoute)}/>
            <Button title="load" onPress={() => setTempToggle(!tempToggle)}/>
        </View>
    )
}
