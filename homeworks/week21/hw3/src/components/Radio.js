import React from 'react';
import styled from 'styled-components';

import { Row, Warning } from './style';

const Title = styled.p`
font-size: 20px;
margin-bottom: 20px;

&::after {
  content: " *";
  color: #e74149;
}
`;

const Label = styled.label`
display: block;
margin-bottom: 23px;
`;

function Group(props) {
  const {
    required,
    status = '', // '', warning
    children,
    title,
    message
  } = props;
  return (
    <Row required={required} status={status}>
      <Title>{title}</Title>
      {children}
      <Warning status={status}>{message}</Warning>
    </Row>
  )
}

function Radio(props) {
  const {
    name,
    id,
    value,
    onChange,
    label
  } = props;
  return (
    <Label htmlFor={id}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
      {label}
    </Label>
  )
}

Radio.Group = Group;

export default Radio;
