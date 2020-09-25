import React from 'react';
import ChampionItem from '../../components/main/ChampionItem';

const ChampionItemContainer = ({
  champion,
  isSelected,
  setSelectedChampion,
}) => {
  const onClick = () => {
    if (isSelected) {
      setSelectedChampion();
    } else {
      setSelectedChampion(champion);
    }
  };
  return (
    <ChampionItem
      champion={champion}
      isSelected={isSelected}
      onClick={onClick}
    />
  );
};

export default ChampionItemContainer;
