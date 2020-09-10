import React from 'react';
import styled from 'styled-components';
// import palette from '../../lib/styles/palette';

const StyledInput = styled.textarea`
  margin-top: 2rem;
  width: 500px;
  height: 100px;
  resize: none;
  border: none;
`;

const Input = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
