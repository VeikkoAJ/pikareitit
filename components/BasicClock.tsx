import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { format } from 'date-fns';
import { currentRouteStyles } from '../styles/CurrentRouteStyles';

export default function BasicClock() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Text
      style={currentRouteStyles.headerText}
      numberOfLines={1}
      ellipsizeMode="clip"
      adjustsFontSizeToFit
    >
      {format(currentDate, 'HH:mm:ss')}
    </Text>
  );
}
