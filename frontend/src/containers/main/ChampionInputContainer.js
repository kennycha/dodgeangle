import React from 'react';
import ChampionInput from '../../components/main/ChampionInput';

const ChampionInputContainer = ({ allChampions, setResultChampions }) => {
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    const newResultChampions = allChampions.filter((champion) =>
      champion.name.includes(value),
    );
    setResultChampions(newResultChampions);
  };
  return <ChampionInput onChange={onChange} />;
};

export default ChampionInputContainer;
