import React from 'react';
import styled from 'styled-components';

const StyledDebug = styled.div`
${props => props.isDetect && `
  outline: 1px solid red;

  * {
    outline: 1px solid red;
  }
  `
  }
`;

export default function Debug({ children, isDetect }) {
  return (
    <StyledDebug isDetect={isDetect}>
      {children}
    </StyledDebug>
  )
}
