import React from 'react';
import styled from 'styled-components';
// import palette from '../../lib/styles/palette';

const StyledInput = styled.textarea`
  margin-top: 2rem;
  padding: 1rem;
  width: 100%;
  height: 150px;
  resize: none;
  border: none;
`;

const Input = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
