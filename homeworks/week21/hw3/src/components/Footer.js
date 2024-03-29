import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFooter = styled.footer`
background-color: black;
padding: 26px;
font-size: 13px;
color: #999999;
text-align: center;
`;

export default function Footer({ children }) {
  return (
    <StyledFooter>
      {children}
    </StyledFooter>
  )
}

Footer.propTypes = {
  children: PropTypes.any
};
