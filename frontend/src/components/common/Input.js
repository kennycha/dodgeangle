import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';
// import palette from '../../lib/styles/palette';

const StyledInput = styled.textarea`
  margin-top: 1rem;
  padding: 2rem;
  width: 100%;
  height: 250px;
  resize: none;
  border-radius: 20px;
  font-size: 1.5rem;
  color: ${mainTheme.mainFontColor};
`;

const Input = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
