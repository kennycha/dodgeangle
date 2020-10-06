import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSelect from '../../components/main/UserSelect';
import { getDodgeAngle } from '../../modules/dodgeAngle';
import { enemyBanChampion, enemyPickChampion, setCounterChampions, setExpectedChampions } from '../../modules/enemies';
import { banChampion, pickChampion } from '../../modules/teamMates';

const UserSelectContainer = ({ champion }) => {
  const dispatch = useDispatch();
  const { teamMates, enemies, phase } = useSelector(
    ({ teamMates, enemies, phase }) => ({
      teamMates: teamMates.teamMates,
      enemies: enemies.enemies,
      phase: phase.phase,
    }),
  );

  // 닷지각 api 쏘기위한 정보 만드는 코드
  const getParams = async ({ teamMates, enemies }) => {
    const trollArray = [];
    const allyArray = [];
    const enemyArray = [];
    teamMates.forEach((teamMate) => {
      trollArray.push(teamMate.trollIndex);
      allyArray.push(teamMate.pick?.id);
    });
    enemies.forEach((enemy) => {
      enemyArray.push(enemy.pick?.id);
    });
    const troll = trollArray.join(',');
    const ally = allyArray.join(',');
    const enemy = enemyArray.join(',');
    return encodeURI(`troll=${troll}&ally=${ally}&enemy=${enemy}`);
  };

  const { allChampions } = useSelector(({ allchampion }) => ({
    allChampions: allchampion.allchampion,
  }));

  const onClick = (event) => {
    // phase에 따른 분기
    const {
      target: { id },
    } = event;
    if (phase === 'ban') {
      if (id[0] === 'A') {
        dispatch(banChampion({ id: parseInt(id[1]), champion }));
      } else {
        dispatch(enemyBanChampion({ id: parseInt(id[1]), champion }));
        if (allChampions) {
          dispatch(
            setExpectedChampions({
              id: parseInt(id[1]),
              champions: champion.counter.map((targetChampion) => {
                let returnObject = null
                allChampions.forEach((champion) => {
                  if (champion.id === targetChampion.id) {
                    // 이때 champion => 
                    returnObject = {
                      ...champion,
                      winRate: targetChampion.win_rate
                    }
                  }
                });
                return returnObject
              }),
            }),
          );
        }
      }
    } else {
      if (id[0] === 'A') {
        dispatch(pickChampion({ id: parseInt(id[1]), champion }));
        getParams({ teamMates, enemies }).then((res) =>
          dispatch(getDodgeAngle(res)),
        );
      } else {
        dispatch(enemyPickChampion({ id: parseInt(id[1]), champion }));
        getParams({ teamMates, enemies }).then((res) =>
          dispatch(getDodgeAngle(res)),
        );
        // id 로 찾아서 champion 꽂기 
        // chmapion.pick.counter
        if (allChampions) {
          dispatch(
            setCounterChampions({
              id: parseInt(id[1]),
              champions: champion.counter.map((targetChampion) => {
                let returnObject = null
                allChampions.forEach((champion) => {
                  if (champion.id === targetChampion.id) {
                    // 이때 champion => 
                    returnObject = {
                      ...champion,
                      winRate: targetChampion.win_rate
                    }
                  }
                });
                return returnObject
              }),
            }),
          );
        }
      }
    }
  };
  return <UserSelect onClick={onClick} />;
};

export default UserSelectContainer;
