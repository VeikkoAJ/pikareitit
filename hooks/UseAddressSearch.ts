import { useEffect, useRef, useState } from 'react';
import { AddressSearchResponse, Feature } from '../addressSearchTypes';

const _ = require('lodash');

const url = 'http://api.digitransit.fi/geocoding/v1/autocomplete';
/** focusPoint aids geocoding api to return result only close to Helsinki */
const focusPoint = '&focus.point.lat=60.17&focus.point.lon=24.93';
const layers = '&layers=locality,neighbourhood,street,address,venue';
const allowedCities = ['Helsinki', 'Espoo', 'Vantaa', 'Sipoo', 'Kauniainen'];
const searchDelayMS = 1500;

/**
 * Custom hook used to search Addresses using HSL GeoCoding API
 *
 */
export default function UseAddressSearch() {
  const [searchResult, setSearchResult] = useState<Feature[]>([]);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  const throttled = useRef(
    _.throttle((text: string) => {
      getAddresses(text);
    }, searchDelayMS)
  );

  const getAddresses = async (search: string) => {
    try {
      // poor fix to a problem caused by loading routes
      if (search !== undefined && search.length > 2) {
        const response = await fetch(
          `${url}?text=${search}${layers}${focusPoint}`
        );
        const responseJSON: AddressSearchResponse = await response.json();
        setSearchResult(
          responseJSON.features.filter((feature) =>
            allowedCities.includes(feature.properties.locality)
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const search = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => throttled.current(searchText), [searchText]);

  return { searchResult, search };
}
