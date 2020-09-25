import React from 'react';
import styled from 'styled-components';
import ChampionInputContainer from '../../containers/main/ChampionInputContainer';
import ChampionListContainer from '../../containers/main/ChampionListContainer';
import mainTheme from '../../lib/styles/mainTheme';

const ChampionPickerBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
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
