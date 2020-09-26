import React from 'react';
import styled from 'styled-components';
import ChampionItemContainer from '../../containers/main/ChampionItemContainer';

const ChampionListBlock = styled.div`
  padding: 70px;
  padding-left: 100px;
  padding-right: 100px;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(6, 140px);
  grid-auto-rows: 120px;
  gap: 1rem;
  overflow: auto;
  div.spaceholder {
    height: 250px;
  }
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
      <div className="spaceholder" />
    </ChampionListBlock>
  );
};

export default ChampionList;
