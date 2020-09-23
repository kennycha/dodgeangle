import React from 'react';
import styled from 'styled-components';
import allchampions from '../../lib/allchampions';
import palette from '../../lib/styles/palette';

const ChampionPickerBlock = styled.div`
  height: 100%;
  background: ${palette.grape[3]};
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
`;

const ChampionListBlock = styled.div`
  height: 700px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 150px;
  gap: 1rem;
  overflow: auto;
`;

const ChampionItemBlock = styled.div`
  height: 150px;
  width: 150px;
  cursor: pointer;
  background: ${palette.pink[3]};
`;

const SelectedChampionItemBlock = styled(ChampionItemBlock)`
  z-index: 10;
  height: 180px;
  width: 180px;
  background: ${palette.pink[5]};
`;

const ChampionInput = ({ allChampions, setResultChampions }) => {
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    const newResultChampions = allchampions.filter((champion) =>
      champion.name.includes(value),
    );
    setResultChampions(newResultChampions);
  };
  return <Input onChange={onChange} />;
};

const ChampionItem = ({ champion, isSelected, setSelectedChampion }) => {
  const onClick = () => {
    if (isSelected) {
      setSelectedChampion();
    } else {
      setSelectedChampion(champion);
    }
  };
  return isSelected ? (
    <SelectedChampionItemBlock onClick={onClick}>
      <img
        src={require(`../../img/champions/${champion.image}`)}
        width="200px"
        height="200px"
        alt="champion"
      />
      <div>{champion.name}</div>
    </SelectedChampionItemBlock>
  ) : (
    <ChampionItemBlock onClick={onClick}>
      <img
        src={require(`../../img/champions/${champion.image}`)}
        alt="champion"
      />
      <div>{champion.name}</div>
    </ChampionItemBlock>
  );
};

const ChampionList = ({
  resultChampions,
  selectedChampion,
  setSelectedChampion,
}) => {
  return (
    <ChampionListBlock>
      {resultChampions.map((champion) => (
        <ChampionItem
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

const ChampionPicker = ({
  allChampions,
  resultChampions,
  setResultChampions,
  selectedChampion,
  setSelectedChampion,
}) => {
  return (
    <ChampionPickerBlock>
      <ChampionInput
        allChampions={allChampions}
        setResultChampions={setResultChampions}
      />
      <ChampionList
        resultChampions={resultChampions}
        selectedChampion={selectedChampion}
        setSelectedChampion={setSelectedChampion}
      />
    </ChampionPickerBlock>
  );
};

export default ChampionPicker;
