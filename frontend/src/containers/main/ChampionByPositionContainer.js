import React from 'react';
import ChampionByPosition from '../../components/main/ChampionByPosition';

const ChampionByPositionContainer = ({ allChampions, setResultChampions }) => {
  const onPositionClick = (event) => {
    const {
      target: { alt },
    } = event;
    const newResultChampions = allChampions.filter((champion) =>
      champion.pos.includes(alt),
    );
    setResultChampions(newResultChampions);
  };
  const onAllClick = () => {
    setResultChampions(allChampions);
  };
  return (
    <ChampionByPosition
      onPositionClick={onPositionClick}
      onAllClick={onAllClick}
    />
  );
};

export default ChampionByPositionContainer;
