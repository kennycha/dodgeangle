import React from 'react';
import styled, { css } from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const buttonStyle = css`
  border: none;
  border-radius: 15px;
  height: 60px;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: ${mainTheme.mainLogoColor};
  outline: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  background: ${mainTheme.mainButton};

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
    `}
  ${(props) =>
    props.red &&
    css`
      background: ${mainTheme.mainBorder};
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
