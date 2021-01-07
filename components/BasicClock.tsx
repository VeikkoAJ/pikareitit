import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {format} from "date-fns";

export default function BasicClock() {
  const [currentDate, setCurrentDate] = useState( new Date)

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 200);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <Text style={{
    fontSize: 24,
      fontWeight: 'bold',
      color: 'white'
    }}>
      {format(currentDate, "HH:mm:ss")}
    </Text>
  )
}
