import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChampionPicker from '../../components/main/ChampionPicker';
import { getAllChampion } from '../../modules/allchampion';
import { changePhase } from '../../modules/phase';

const ChampionPickerContainer = () => {
  let { allChampions, error } = useSelector(({ allchampion }) => ({
    allChampions: allchampion.allchampion,
    error: allchampion.error,
  }));

  // 인풋 밸류에 따라서 allChampions 중 결과에 해당하는 챔피언들만 array에 담아서 가지고 있음
  const [resultChampions, setResultChampions] = useState(allChampions);
  // 챔피언 리스트 중에서 선택된 챔피언, 선택된 경우 소환사를 지정할 수 있도록 할 것
  const [selectedChampion, setSelectedChampion] = useState();

  const { phase } = useSelector(({ phase }) => ({ phase: phase.phase }));
  const dispatch = useDispatch();
  const onPhaseBtnClick = () => {
    if (phase !== 'complete') {
      const ok = window.confirm(
        `확인 시 ${
          phase === 'ban' ? '벤 정보' : '픽 정보'
        } 변경이 불가합니다. 계속 진행하시겠습니까?`,
      );
      if (ok) {
        dispatch(changePhase({ currentPhase: phase }));
      }
    }
  };

  useEffect(() => {
    // 여기서 전체 챔피언 가져올 것
    dispatch(getAllChampion());
  }, [dispatch]); // 첫 render 시에만 {} 안의 내용을 실행

  useEffect(() => {
    setResultChampions(allChampions);
  }, [allChampions]);

  return (
    <ChampionPicker
      allChampions={allChampions}
      error={error}
      resultChampions={resultChampions}
      setResultChampions={setResultChampions}
      selectedChampion={selectedChampion}
      setSelectedChampion={setSelectedChampion}
      phase={phase}
      onPhaseBtnClick={onPhaseBtnClick}
    />
  );
};

export default ChampionPickerContainer;
