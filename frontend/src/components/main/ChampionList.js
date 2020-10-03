import React from 'react';
import styled from 'styled-components';
import ChampionItemContainer from '../../containers/main/ChampionItemContainer';

const ChampionListBlock = styled.div`
  padding: ${80 / 16}rem;
  padding-top: ${50 / 16}rem;
  height: ${600 / 16}rem;
  display: grid;
  grid-template-columns: repeat(6, ${100 / 16}rem);
  grid-auto-rows: ${100 / 16}rem;
  gap: 1rem;
  overflow: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  div.spaceholder {
    height: ${250 / 16}rem;
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
