import React from 'react';
import { Text, View } from 'react-native';

interface EmptyBlockProps {
  width: number;
}

export default function EmptyBlock({ width }: EmptyBlockProps) {
  return (
    <View
      style={{
        width,
        minHeight: width * 0.5,
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          textAlignVertical: 'center',
          textAlign: 'center',
          fontSize: 24,
        }}
      >
        +
      </Text>
    </View>
  );
}
