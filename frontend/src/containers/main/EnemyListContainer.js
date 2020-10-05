import React, { useEffect } from 'react';
import EnemyList from '../../components/main/EnemyList';
import { useSelector, useDispatch } from 'react-redux';
import {
  confirmEnemies,
  // setExpectedChampions,
  // setCounterChampions,
} from '../../modules/enemies';

const EnemyListContainer = () => {
  const dispatch = useDispatch();

  const { enemies } = useSelector(({ enemies }) => ({
    enemies: enemies.enemies,
  }));
  // 이 공간엔 AllyList의 모스트 챔피언 => EnemyList의 카운터 챔피언으로 대칭
  // useEffect(() => {
  //   // enemies 변화 => ban or pick에 의한 변화에 반응하려고 함
  //   if (enemies) {
  //     enemies.forEach((enemy) => {
  //       // pick이 되었을때 => 우선순위 pick > ban
  //       if (enemy.pick && enemy.counterChampions === null) {
  //         let newCounterChampions = [0, 1, 2].map(() => ({
  //           ...allchampions[Math.floor(Math.random() * allchampions.length)],
  //           winRate: Math.floor(Math.random() * 100),
  //         }));
  //         dispatch(
  //           setCounterChampions({
  //             id: enemy.id,
  //             champions: newCounterChampions,
  //           }),
  //         );
  //         // return : ban과 pick은 1개씩만 업데이트 된다.
  //         return;
  //       }

  //       if (enemy.ban && enemy.expectedChampions === null) {
  //         let newExpectedChampions = [0, 1, 2].map(() => ({
  //           ...allchampions[Math.floor(Math.random() * allchampions.length)],
  //           winRate: Math.floor(Math.random() * 100),
  //         }));
  //         dispatch(
  //           setExpectedChampions({
  //             id: enemy.id,
  //             champions: newExpectedChampions,
  //           }),
  //         );
  //         // return : ban과 pick은 1개씩만 업데이트 된다.
  //         return;
  //       }
  //     });
  //   }
  // }, [enemies, dispatch]);
  useEffect(() => {
    // enemies 변화되었거나 첫 렌더링일때 useEffect는 실행
    if (enemies) {
      // enemies !== null 일때 => enemies 로컬스토리지에 업데이트
      localStorage.setItem(
        'enemies',
        JSON.stringify(
          enemies.map((enemy) => ({
            ...enemy,
          })),
        ),
      );
    }
  }, [enemies, dispatch]);
  return <EnemyList enemies={enemies} />;
};

export default EnemyListContainer;
