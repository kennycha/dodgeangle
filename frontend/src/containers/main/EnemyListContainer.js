import React, { useEffect } from 'react';
import EnemyList from '../../components/main/EnemyList';
import { useSelector, useDispatch } from 'react-redux';
import { confirmEnemies } from '../../modules/enemies'

const EnemyListContainer = () => {
  const dispatch = useDispatch();

  const { enemies } = useSelector(({ enemies }) => ({
    enemies: enemies.enemies,
  }));

  // 이 공간엔 AllyList의 모스트 챔피언 => EnemyList의 카운터 챔피언으로 대칭
  
  useEffect(() => {
    // enemies 변화되었거나 첫 렌더링일때 useEffect는 실행
    if (enemies) {
      // enemies !== null 일때 => enemies 로컬스토리지에 업데이트
      localStorage.setItem(
        "enemies",
        JSON.stringify(
          enemies.map(enemy => ({
            id: enemy.id,
            ban: enemy.ban,
            pick: enemy.pick,
          }))
        )
      );
    } else {
      // enemies === null 일때
      if (localStorage.getItem("enemies")) {
        // 로컬스토리 값이 존재 => 로컬스토리지 값을 Redux에 반영하기
        dispatch(confirmEnemies(JSON.parse(localStorage.getItem("enemies"))))
      } else {
        // enemies가 null 값 === 초기 생성이후, null값으로 변경된 상태에서 Redux에 남아 있는 상태
        // => 초기화 한다.
        dispatch(confirmEnemies(null))
      }
    }
  },
  [enemies, dispatch]
  );
  return <EnemyList enemies={enemies} />;
};

export default EnemyListContainer;
