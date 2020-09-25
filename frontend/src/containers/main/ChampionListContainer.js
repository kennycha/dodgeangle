import React from 'react';
import ChampionList from '../../components/main/ChampionList';

const ChampionListContainer = ({
  resultChampions,
  selectedChampion,
  setSelectedChampion,
}) => {
  return (
    <ChampionList
      resultChampions={resultChampions}
      selectedChampion={selectedChampion}
      setSelectedChampion={setSelectedChampion}
    />
  );
};

export default ChampionListContainer;
