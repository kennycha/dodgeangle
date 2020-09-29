import React, { useEffect } from 'react';
import AllyList from '../../components/main/AllyList';
import { useSelector, useDispatch } from 'react-redux';
import { setMostChampions, confirmTeamMates } from '../../modules/teamMates';
import { useHistory } from 'react-router-dom';

const AllyListContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { teamMates } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
  }));
  if (!Boolean(teamMates)) {
    history.push('/');
  }

  useEffect(() => {
    // 아래는 임시코드, 실제론 API 요청해서 받기
    if (teamMates && !teamMates.mostChampions) {
      // PreEnter에서 MainPage로 처음 넘어오는 상황에서 작동
      // === teamMates는 존재하는데, 모스트 챔피언은 없으면
      // => 모스트 챔피언 요청
      const mostChampionsArray = [
        {
          id: 0,
          champions: [
            { id: 111, name: '카밀', img: 'Camille.png', winRate: 70 },
            { id: 111, name: '아트록스', img: 'Aatrox.png', winRate: 80 },
            { id: 111, name: '아무무', img: 'Amumu.png', winRate: 90 },
          ],
          winRates: [45, 25, 35],
        },
        {
          id: 1,
          champions: [
            { id: 111, name: '티모', img: 'Teemo.png', winRate: 11 },
            { id: 111, name: '애쉬', img: 'Ashe.png', winRate: 22 },
            { id: 111, name: '카밀', img: 'Camille.png', winRate: 33 },
          ],
          winRates: [45, 25, 35],
        },
        {
          id: 2,
          champions: [
            { id: 111, name: '아지르', img: 'Azir.png', winRate: 44 },
            { id: 111, name: '티모', img: 'Teemo.png', winRate: 55 },
            { id: 111, name: '애쉬', img: 'Ashe.png', winRate: 66 },
          ],
          winRates: [70, 27, 37],
        },
        {
          id: 3,
          champions: [
            { id: 111, name: '애쉬', img: 'Ashe.png', winRate: 77 },
            { id: 111, name: '아지르', img: 'Azir.png', winRate: 88 },
            { id: 111, name: '티모', img: 'Teemo.png', winRate: 99 },
          ],
          winRates: [91, 29, 93],
        },
        {
          id: 4,
          champions: [
            { id: 111, name: '아트록스', img: 'Aatrox.png', winRate: 12 },
            { id: 111, name: '아무무', img: 'Amumu.png', winRate: 23 },
            { id: 111, name: '티모', img: 'Teemo.png', winRate: 34 },
          ],
          winRates: [55, 44, 33],
        },
      ];
      mostChampionsArray.forEach((arr) => {
        dispatch(
          setMostChampions({
            id: arr.id,
            champions: arr.champions,
            // 기존 샘플 코드
            // champions: [0,1,2].map(idx =>
            //   [arr.champions[idx], arr.winRates[idx]]
            // )
          }),
        );
      });
    }
  }, [dispatch]);

  useEffect(() => {
    // teamMates가 변화되었거나 첫 렌더링일때 useEffect는 실행
    if (teamMates) {
      // teamMates !== null 일때 => teamMates값을 로컬스토리지에 업데이트
      localStorage.setItem(
        'teamMates',
        JSON.stringify(
          teamMates.map((teamMate) => ({
            ...teamMate
          })),
        ),
      );
    } else {
      // teamMates === null 일때
      if (localStorage.getItem('teamMates')) {
        // 로컬스토리 값이 존재 => 로컬스토리지 값을 Redux에 반영하기
        dispatch(
          confirmTeamMates(JSON.parse(localStorage.getItem('teamMates'))),
        );
      }
    }
  }, [teamMates, dispatch]);

  return <AllyList teamMates={teamMates} />;
};

export default AllyListContainer;
