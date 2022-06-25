import React from 'react';
import styled from 'styled-components';

import { Row, RowTitle, Warning } from './style';

const Subtitle = styled.p`
font-size: 14px;
margin-bottom: 24px;
`;




export default function Input(props) {
  const {
    type = 'text',
    name,
    id,
    placeholder,
    value,
    onChange,
    label,
    required = false,
    status = '', // '', warning
    message,
    subtitle
  } = props;
  return (
    <Row required={required} status={status}>
      <RowTitle required={required}htmlFor={name}>{label}</RowTitle>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <Warning status={status}>{message}</Warning>
    </Row>)
}