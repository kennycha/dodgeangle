import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSelect from '../../components/main/UserSelect';
import allchampion from '../../modules/allchampion';
import { enemyBanChampion, enemyPickChampion, setCounterChampions, setExpectedChampions } from '../../modules/enemies';
import { banChampion, pickChampion } from '../../modules/teamMates';

const UserSelectContainer = ({ champion }) => {
  const dispatch = useDispatch();
  const { phase } = useSelector(({ phase }) => ({
    phase: phase.phase,
  }));
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
      } else {
        dispatch(enemyPickChampion({ id: parseInt(id[1]), champion }));
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
