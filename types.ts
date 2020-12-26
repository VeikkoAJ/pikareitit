

export type coordinate = {
    lat: number,
    lon: number
}

export type RouteMiddleSectorProps = {
    iconName: String
}

export type RouteTransportLegUnit = {
    name: string,
    startTime: number,
    endTime: number,
    realTime: boolean
}

export type RouteTransportLeg = {
    startPlace: string,
    //BUS, TRAIN, TRAM, METRO, FERRY
    transportMode: string,
    transportLegUnits: RouteTransportLegUnit[]
}
export type TransportMode ={
    mode: string
}

export type RouteTransportLegQueryParam = {
    from: string,
    to: string,
    date: string,
    time: string
    //BUS, TRAIN, TRAM, METRO, FERRY
}

export type RouteTransportLegQueryResponse = {
    'data' : {
        'plan' : {
            'itineraries' : {}
        }
    }
}
