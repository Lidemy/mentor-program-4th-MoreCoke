import React, { useState } from 'react';

import { PrimaryButton } from '../../../../components/Button';
import { TextInput } from '../../../../components/TextInput';
import {
  TodoAddBarWrapper,
  TextInputWrapper,
  ButtonWrapper,
} from './style';

export default function TodoAddBar(props) {
  const [inputValue, setInputValue] = useState('');

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onClick = () => {
    if (!inputValue) return;
    props?.onClick?.(inputValue);
    setInputValue('');
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <TodoAddBarWrapper>
      <TextInputWrapper>
        <TextInput
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={inputValue}
        />
      </TextInputWrapper>
      <ButtonWrapper>
        <PrimaryButton onClick={onClick}>新增</PrimaryButton>
      </ButtonWrapper>
    </TodoAddBarWrapper>
  );
}
