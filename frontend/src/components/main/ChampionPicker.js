import React from 'react';
import styled from 'styled-components';
import ChampionByPositionContainer from '../../containers/main/ChampionByPositionContainer';
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

const Spliter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
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
      <Spliter>
        <ChampionByPositionContainer
          allChampions={allChampions}
          setResultChampions={setResultChampions}
        />
        <ChampionInputContainer
          allChampions={allChampions}
          setResultChampions={setResultChampions}
        />
      </Spliter>
      <ChampionListContainer
        resultChampions={resultChampions}
        selectedChampion={selectedChampion}
        setSelectedChampion={setSelectedChampion}
      />
    </ChampionPickerBlock>
  );
};

export default ChampionPicker;
