import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const ChampionPickerBlock = styled.div`
  height: 100%;
  background: ${palette.grape[3]};
`;

const Input = styled.input``;

const ChampionListBlock = styled.div``;

const ChampionItemBlock = styled.div``;

const ChampionItem = () => {
  return <ChampionItemBlock>Champion</ChampionItemBlock>;
};

const ChampionList = () => {
  return (
    <ChampionListBlock>
      <ChampionItem />
      <ChampionItem />
    </ChampionListBlock>
  );
};

const ChampionPicker = ({
  allChampions,
  resultChampions,
  setResultChampions,
  selectedChampion,
  setSelectedChampion,
}) => {
  return (
    <ChampionPickerBlock>
      <Input />
      <ChampionList />
    </ChampionPickerBlock>
  );
};

export default ChampionPicker;
