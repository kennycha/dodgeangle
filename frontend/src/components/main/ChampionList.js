import React from 'react';
import styled from 'styled-components';
import ChampionItemContainer from '../../containers/main/ChampionItemContainer';

const ChampionListBlock = styled.div`
  height: 700px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 150px;
  gap: 1rem;
  overflow: auto;
`;

const ChampionList = ({
  resultChampions,
  selectedChampion,
  setSelectedChampion,
}) => {
  return (
    <ChampionListBlock>
      {resultChampions.map((champion) => (
        <ChampionItemContainer
          key={champion.id}
          champion={champion}
          isSelected={
            selectedChampion ? selectedChampion.id === champion.id : false
          }
          setSelectedChampion={setSelectedChampion}
        />
      ))}
    </ChampionListBlock>
  );
};

export default ChampionList;
