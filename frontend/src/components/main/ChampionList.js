import React from 'react';
import styled from 'styled-components';
import ChampionItemContainer from '../../containers/main/ChampionItemContainer';

const ChampionListBlock = styled.div`
  padding: ${70/16}rem;
  padding-left: ${100/16}rem;
  padding-right: ${100/16}rem;
  height: ${700/16}rem;
  display: grid;
  grid-template-columns: repeat(6, ${140/16}rem);
  grid-auto-rows: ${120/16}rem;
  gap: 1rem;
  overflow: auto;
  div.spaceholder {
    height: ${250/16}rem;
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
