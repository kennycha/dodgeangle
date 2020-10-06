import React, { useEffect } from 'react';
import AllyList from '../../components/main/AllyList';
import { useSelector, useDispatch } from 'react-redux';
// import { setMostChampions } from '../../modules/teamMates';
import { useHistory } from 'react-router-dom';

const AllyListContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { teamMates, meSelected } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
    meSelected: teamMates.meSelected,
  }));
  if (!Boolean(teamMates) || !meSelected) {
    history.push('/');
  }

  // useEffect(() => {
  //   // 아래는 임시코드, 실제론 API 요청해서 받기

  //   if (teamMates && teamMates[0]?.mostChampions == null) {
  //     // PreEnter에서 MainPage로 처음 넘어오는 상황에서 작동
  //     // === teamMates는 존재하는데, 모스트 챔피언은 없으면
  //     // => 모스트 챔피언 요청
  //     teamMates.forEach((teamMate) => {
  //       let newMostChampions = [0, 1, 2].map(() => ({
  //         ...allchampions[Math.floor(Math.random() * allchampions.length)],
  //         winRate: Math.floor(Math.random() * 100),
  //       }));
  //       dispatch(
  //         setMostChampions({
  //           id: teamMate.id,
  //           champions: newMostChampions,
  //         }),
  //       );
  //     });
  //   }
  // }, [teamMates, dispatch]);

  useEffect(() => {
    // teamMates가 변화되었거나 첫 렌더링일때 useEffect는 실행
    if (teamMates) {
      // teamMates !== null 일때 => teamMates값을 로컬스토리지에 업데이트
      localStorage.setItem(
        'teamMates',
        JSON.stringify(
          teamMates.map((teamMate) => ({
            ...teamMate,
          })),
        ),
      );
    }
  }, [teamMates, dispatch]);

  return <AllyList teamMates={teamMates} />;
};

export default AllyListContainer;
