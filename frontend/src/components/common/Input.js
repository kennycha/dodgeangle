import React from 'react';
import styled, { css } from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const StyledInput = styled.textarea`
  margin-top: 1rem;
  padding: 2rem;
  width: 100%;
  height: 250px;
  resize: none;
  border-radius: 20px;
  font-size: 1.5rem;
  color: ${mainTheme.mainFontColor};
  ${(props) =>
    props.disabled &&
    css`
      background: ${mainTheme.mainBackground};
      height: 200px;
      overflow: hidden;
      opacity: 0.5;
    `}
`;

const Input = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
