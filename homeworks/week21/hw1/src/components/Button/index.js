import styled from 'styled-components';

import theme from 'constants/theme';

export const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s;
  outline: none;
`;

export const WarningButton = styled(Button)`
  background-color: ${theme.warning};
  border-color: ${theme.warning};
  color: ${theme.black};
  &:focus {
    border-color: ${theme.warning};
  }
`;

export const DangerButton = styled(Button)`
  background-color: ${theme.danger};
  border-color: ${theme.danger};
  color: ${theme.white};
  &:focus {
    border-color: ${theme.danger};
  }
`;

export const InfoButton = styled(Button)`
  background-color: ${theme.info};
  border-color: ${theme.info};
  color: ${theme.white};
  &:focus {
    border-color: ${theme.info};
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${theme.primary};
  border-color: ${theme.primary};
  color: ${theme.white};
  &:focus {
    border-color: ${theme.primary};
  }
`;

export const SuccessButton = styled(Button)`
  background-color: ${theme.success};
  border-color: ${theme.success};
  color: ${theme.white};
  &:focus {
    border-color: ${theme.success};
  }
`;
