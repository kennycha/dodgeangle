import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 50px;
`;

const ChampionInput = ({ onChange }) => {
  return <Input onChange={onChange} />;
};

export default ChampionInput;
