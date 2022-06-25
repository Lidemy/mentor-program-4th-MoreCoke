import styled from 'styled-components';


export const Row = styled.div`
margin-bottom: 49px;
position: relative;

input {
  box-sizing: border-box;
  border: 1px solid #d0d0d0;
}

input:not([type="radio"]) {
  max-width: 287px;
  width: 100%;
  height: 23px;
}

${
  props => props.status === 'warning' && `
  input:not([type="radio"]) {
    outline: 2px solid red;
  }
  `
}

input::placeholder {
  font-size: 16px;
  color: #afafaf;
}

`;

export const RowTitle = styled.label`
display: block;
font-size: 20px;
margin-bottom: 20px;

${
  props => props.required && `
  ::after {
    content: " *";
    color: #e74149;
  }
`}
`

export const Warning = styled.p`
position: absolute;
bottom: -30px;
color: red;
font-size: 14px;
display: ${props => props.status === 'warning' ? 'block' : 'none'};
`;