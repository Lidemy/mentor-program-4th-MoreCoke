import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledForm = styled.form`
box-sizing: border-box;
border-top: 8px solid #fad312;
background-color: white;
box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
padding: 54px 40px 35px 40px;
max-width: 639px;
margin: 129px auto 66px auto;

.postpone-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 35px;
}

.postpone-description {
  font-size: 14px;
  line-height: 28px;
  margin-bottom: 22px;
}

.postpone-needed {
  display: inline-block;
  margin-bottom: 55px;
  color: #e74149;
  font-size: 16px;
}

.postpone-needed::before {
  content: "* ";
  color: #e74149;
}

.postpone-btn {
  outline: none;
  border: 1px solid #fad312;
  box-sizing: border-box;
  width: 92px;
  height: 40px;
  border-radius: 3px;
  background-color: #fad312;
  font-size: 15px;
}

.mt-21 {
  margin-top: 21px;
}

@media (max-width: 476px) {
  margin: 129px 10px 30px 10px;

  .postpone-title {
    font-size: 24px;
  }
`;

export default function Form({ children, onSubmit }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      {children}
    </StyledForm>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.any
};
