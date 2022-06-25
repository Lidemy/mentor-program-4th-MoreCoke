import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

Debug.propTypes = {
  isDetect: PropTypes.bool,
  children: PropTypes.any
};
