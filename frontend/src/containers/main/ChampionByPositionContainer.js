import React from 'react';
import ChampionByPosition from '../../components/main/ChampionByPosition';
import allchampions from '../../lib/allchampions';

const ChampionByPositionContainer = ({ allChampions, setResultChampions }) => {
  const onPositionClick = (event) => {
    const {
      target: { alt },
    } = event;
    const newResultChampions = allchampions.filter((champion) =>
      champion.pos.includes(alt),
    );
    setResultChampions(newResultChampions);
  };
  const onAllClick = () => {
    setResultChampions(allchampions);
  };
  return (
    <ChampionByPosition
      onPositionClick={onPositionClick}
      onAllClick={onAllClick}
    />
  );
};

export default ChampionByPositionContainer;
