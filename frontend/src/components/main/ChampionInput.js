import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const Input = styled.input`
  margin: 2rem;
  margin-top: 0;
  margin-bottom: 0;
  padding: 2rem;
  height: ${80 / 16}rem;
  width: calc(100% - 10rem);
  background: ${mainTheme.mainSummoner};
  color: ${mainTheme.mainFontColor};
  font-size: 1.25rem;
  border: ${3 / 16}rem solid ${mainTheme.mainBorder};
`;

const ChampionInput = ({ onChange }) => {
  return <Input onChange={onChange} placeholder="검색" />;
};

export default ChampionInput;
