import { Route } from '../types';

export default function exampleRoute(): Route {
  return {
    routeName: 'mallireitti',
    description: 'testaa tällä reitillä sovelluksen ominaisuudet',
    originPlace: 'Tarvaspääntie',
    finalDestination: 'Syystie 19',
    startWalkDuration: 1.3 * 60,
    routeTransportLegRows: [
      {
        routeLegs: [
          {
            from: {
              address: 'Tarvaspääntie, Espoo',
              lat: 60.2115478,
              lon: 24.8292963,
            },
            to: {
              address: 'Leppävaaran asema, Espoo',
              lat: 60.2193775,
              lon: 24.8113851,
            },
            transportModes: [{ mode: 'BUS' }],
          },
        ],
        middleSector: 'single',
      },
      {
        routeLegs: [
          {
            from: {
              address: 'Leppävaaran asema, Espoo',
              lat: 60.2193775,
              lon: 24.8113851,
            },
            to: {
              address: 'Pasilan asema, Helsinki',
              lat: 60.1986935,
              lon: 24.9345064,
            },
            transportModes: [{ mode: 'RAIL' }],
          },
        ],
        middleSector: 'single',
      },
      {
        routeLegs: [
          {
            from: {
              address: 'Pasilan asema, Helsinki',
              lat: 60.1986935,
              lon: 24.9345064,
            },
            to: {
              address: 'Pukinmäen asema, Helsinki',
              lat: 60.2424651,
              lon: 24.9917559,
            },
            secondaryTo: {
              address: 'Malmin asema, Helsinki',
              lat: 60.2506078,
              lon: 25.0094086,
            },
            transportModes: [{ mode: 'RAIL' }],
          },
        ],
        middleSector: 'split',
      },
      {
        routeLegs: [
          {
            from: {
              address: 'Pukinmäen asema, Helsinki',
              lat: 60.2424651,
              lon: 24.9917559,
            },
            to: {
              address: 'Syystie 19, Helsinki',
              lat: 60.2567313,
              lon: 24.9973389,
            },
            transportModes: [{ mode: 'BUS' }],
          },
          {
            from: {
              address: 'Malmin asema, Helsinki',
              lat: 60.2506078,
              lon: 25.0094086,
            },
            to: {
              address: 'Syystie 19, Helsinki',
              lat: 60.2567313,
              lon: 24.9973389,
            },
            transportModes: [{ mode: 'BUS' }],
          },
        ],
        middleSector: 'merge',
      },
    ],
  };
}
