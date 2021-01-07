import React, {useEffect, useState} from 'react';
import {Button, FlatList, StatusBar, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Route} from '../types';
import {RouteNameList} from '../components/RouteNameList';

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

interface routeKeyPair {
    route: Route,
    key: string
}

export function HomeScreen() {

    const [routeKeys, setRouteKeys] = useState<string[]>([]);
    const [routes, setRoutes] = useState<routeKeyPair[]>([])
    const [activeRoute, setActiveRoute] = useState<Route| undefined>(undefined)

    useEffect(() => {
        async function getRouteKeys() {
            try {
                const keys = await AsyncStorage.getAllKeys()
                if (keys !== undefined) {
                    setRouteKeys(keys);
                    const fetchedRoutes = await AsyncStorage.multiGet(keys)
                    if (fetchedRoutes !== undefined) {
                        // @ts-ignore
                        // TODO fix mapping
                        setRoutes(fetchedRoutes.map(route => {
                            if (route[1] !== null) {
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
    }, [])

    const storeRoute = async (route: Route) => {
        try {
            const jsonRoute = JSON.stringify(route)
            await AsyncStorage.setItem('testKey', jsonRoute)
            console.log('fetching')
        } catch (e) {
            console.log("failed to save route:", e)
        } finally {
            console.log("stored values")
        }
    }
    // TODO rename this
    interface renderItemProps {
        route: Route,
        key: string
    }

    const renderItem = (_: routeKeyPair) => (
        <RouteNameList
          name={_.route.routeName}
          originPlace={route.originPlace}
          finalDestination={route.finalDestination}
          setActiveRoute={() => setActiveRoute(route)}
        />
    )

    return (
        <View style={{
            marginTop: StatusBar.currentHeight
        }}>
            <Text>home screen</Text>
            <Button title='save' onPress={() => storeRoute(testRoute)}/>
            <FlatList data={routes} renderItem={renderItem} keyExtractor={_ => _.key}/>
        </View>
    )
}
