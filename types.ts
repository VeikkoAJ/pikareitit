

export type coordinate = {
    lat: number,
    lon: number
}

export type RouteMiddleSectorProps = {
    iconName: String
}

export type RouteTransportLegUnit = {
    name: string,
    startTime: Date,
    endTime: Date,
    realTime: boolean
}

export type RouteTransportLeg = {
    startPlace: string,
    //BUS, TRAIN, TRAM, METRO, FERRY
    transportMode: string,
    transportLegUnits: RouteTransportLegUnit[]
}

export type RouteTransportLegQueryParam = {
    from: string,
    to: string,
    //in milliseconds
    delay: number,
    //BUS, TRAIN, TRAM, METRO, FERRY
    transportModes: string[]
}

export type RouteTransportLegQueryResponse = {
    'data' : {
        'plan' : {
            'itineraries' : {}
        }
    }
}
