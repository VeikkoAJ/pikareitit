import { Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
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
  defaultValue = undefined,
  text,
  answer,
  flexRate = 1,
  keyboardType = undefined,
  setAnswer,
}: TextInputBarProps) {
  const [isEdited, setEdited] = useState(false);
  const flexValues = () => ({
    left: flexRate,
    right: 1 / flexRate,
  });

  return (
    <View style={listForm.textInput}>
      <Text style={[listForm.fieldName, { flex: flexValues().left }]}>
        {text}
      </Text>
      <TextInput
        style={[listForm.fieldAnswer, { flex: flexValues().right }]}
        keyboardType={keyboardType === undefined ? 'default' : keyboardType}
        defaultValue={defaultValue}
        value={isEdited || defaultValue === undefined ? answer : defaultValue}
        onChangeText={(newAnswer) => {
          setAnswer(newAnswer);
          setEdited(true);
        }}
      />
    </View>
  );
}
