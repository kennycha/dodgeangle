import React from 'react';
import styled from 'styled-components';
import ChampionInputContainer from '../../containers/main/ChampionInputContainer';
import ChampionListContainer from '../../containers/main/ChampionListContainer';
import palette from '../../lib/styles/palette';

const ChampionPickerBlock = styled.div`
  height: 100%;
  background: ${palette.grape[3]};
`;

const ChampionPicker = ({
  allChampions,
  resultChampions,
  setResultChampions,
  selectedChampion,
  setSelectedChampion,
}) => {
  return (
    <ChampionPickerBlock>
      <ChampionInputContainer
        allChampions={allChampions}
        setResultChampions={setResultChampions}
      />
      <ChampionListContainer
        resultChampions={resultChampions}
        selectedChampion={selectedChampion}
        setSelectedChampion={setSelectedChampion}
      />
    </ChampionPickerBlock>
  );
};

export default ChampionPicker;
