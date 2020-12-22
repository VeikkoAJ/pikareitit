import {RouteTransportLeg, RouteTransportLegQueryParam} from "../types";
const axios = require('axios').default;



export async function getRoute(parameters: RouteTransportLegQueryParam, currentTime: Date): Promise<RouteTransportLeg> {

    const errorReturn: RouteTransportLeg = {
        startPlace: 'Error',
        transportMode: 'construction',
        transportLegUnits: []
    }
    const startTime = new Date(currentTime.getMilliseconds() + parameters.delay);

    const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
    const header = { 'Content-Type': 'application/graphql' };
    const data = `{
          plan(
            fromPlace: "${parameters.from}",
            toPlace: "${parameters.to}",
            date: "${startTime.getFullYear().toString() + '-' + startTime.getMonth().toString() + '-' + startTime.getDate().toString()}",
            time: "${startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + ':' + startTime.getSeconds().toString()}",
            numItineraries: 3,
            transportModes: [
                {mode: ${parameters.transportModes[0]}, 
                {mode: ${parameters.transportModes[1]}}, 
                {mode: ${parameters.transportModes[2]}}, 
                {mode: ${parameters.transportModes[3]}},
                {mode: ${parameters.transportModes[4]}}
            ]
          ) {
            itineraries{
              duration
              legs {
                startTime
                from {
                  name
                }
                route {
                  shortName
                }
              }
            }
          }
        }`;

    axios.post({ url }, {data}, {header})
        .then(function (response: { data: any; }) {
            console.log(response.data);
            return {
                startPlace: response.data,
                transportMode: 'construction',
                transportLegUnits: [
                    {},
                    {},
                    {}
                ]
            }
        }).catch(function (error: any) {
            console.log(error);
    })
    return (errorReturn)
}
