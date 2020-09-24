import React, { useEffect, useState } from 'react';
import ChampionPicker from '../../components/main/ChampionPicker';
import allchampions from '../../lib/allchampions';

const ChampionPickerContainer = () => {
  // api를 통해 전체 챔피언을 정렬해서 가져온 후 가지고 있을 것
  const allChampions = allchampions.sort((a, b) => (a.name < b.name ? -1 : 1));
  // 인풋 밸류에 따라서 allChampions 중 결과에 해당하는 챔피언들만 array에 담아서 가지고 있음
  const [resultChampions, setResultChampions] = useState(allChampions);
  // 챔피언 리스트 중에서 선택된 챔피언, 선택된 경우 소환사를 지정할 수 있도록 할 것
  const [selectedChampion, setSelectedChampion] = useState();

  useEffect(() => {
    // 여기서 전체 챔피언 가져올 것
  }, []); // 첫 render 시에만 {} 안의 내용을 실행
  return (
    <ChampionPicker
      allChampions={allChampions}
      resultChampions={resultChampions}
      setResultChampions={setResultChampions}
      selectedChampion={selectedChampion}
      setSelectedChampion={setSelectedChampion}
    />
  );
};

export default ChampionPickerContainer;
