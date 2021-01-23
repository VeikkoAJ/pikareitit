import { Text, TextInput, View } from 'react-native';
import React from 'react';
import { listForm } from '../styles/BasicStyles';

interface TextInputBarProps {
  defaultValue?: string;
  text: string;
  answer: string;
  flexRate?: number;
  keyboardType?: undefined | 'decimal-pad';
  setAnswer: (newText: string) => void;
}

export function TextInputBar({
  defaultValue,
  text,
  answer,
  flexRate,
  keyboardType,
  setAnswer,
}: TextInputBarProps) {
  const flexValues = () => {
    if (flexRate !== undefined) {
      return {
        left: flexRate,
        right: 1 / flexRate,
      };
    }
    return {
      left: 1,
      right: 1,
    };
  };

  return (
    <View style={listForm.textInput}>
      <Text style={[listForm.fieldName, { flex: flexValues().left }]}>
        {text}
      </Text>
      <TextInput
        style={[listForm.fieldAnswer, { flex: flexValues().right }]}
        keyboardType={keyboardType === undefined ? 'default' : keyboardType}
        defaultValue={defaultValue}
        value={answer}
        onChangeText={(newAnswer) => setAnswer(newAnswer)}
      />
    </View>
  );
}
