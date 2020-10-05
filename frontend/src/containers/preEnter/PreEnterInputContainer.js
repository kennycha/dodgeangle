import React, { useState } from 'react';
import PreEnterInput from '../../components/preEnter/PreEnterInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmTeamMates,
  // fetchApiData,
  initializeMe,
} from '../../modules/teamMates';
import { confirmEnemies } from '../../modules/enemies';
import { initializePhase } from '../../modules/phase';

const PreEnterInputContainer = () => {
  const [innerTeamMates, setInnerTeamMates] = useState(``);
  const dispatch = useDispatch();
  const { teamMates } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
  }));

  const onButtonClick = () => {
    if (innerTeamMates.length !== 0) {
      const parsedTeamMates = innerTeamMates
        .split('\n')
        .map((t) => t.trim().slice(0, -15))
        .slice(0, 5);
      const teamMatesArray = parsedTeamMates.map((teamMate) => ({
        id: parsedTeamMates.indexOf(teamMate),
        name: teamMate,
        pos: 'top',
        me: false,
        ban: null,
        pick: null,
        mostChampions: null,
        badges: null,
      }));
      dispatch(confirmTeamMates(teamMatesArray));
      dispatch(confirmEnemies(null));

      // 이곳에서 API로 요청해서 => 1.most_lane => pos 2.most_champion => mostChampions 3. streak_win or streak_lost => badges : 연승중 or 연패중
      //  SAMPLE 데이터 생성
      // let apiArraySample = [0, 1, 2, 3, 4].map((idx) => {
      //   let streak = Math.floor(Math.random() * 21) - 10; // -10연패 ~ 10연승
      //   let lane = ['top', 'jgl', 'mid', 'adc', 'sup'];
      //   return {
      //     summoner: teamMatesArray[idx].name,
      //     streak_win: streak >= 0 ? streak : 0,
      //     streak_loss: streak < 0 ? -streak : 0,
      //     most_lane: lane[Math.floor(Math.random() * 5)],
      //     troll_index: Math.floor(Math.random() * 101),
      //     most_champion: [0, 1, 2].map(() => ({
      //       ...allchampions[Math.floor(Math.random() * allchampions.length)],
      //       winRate: Math.floor(Math.random() * 101),
      //       count_game: Math.floor(Math.random() * 101),
      //       counter: [0, 1, 2].map(() => ({
      //         ...allchampions[Math.floor(Math.random() * allchampions.length)],
      //       })),
      //     })),
      //   };
      // });
      // apiArraySample.forEach((arr) => {
      //   dispatch(fetchApiData(arr));
      // });
    }
  };
  const onInputChange = (e) => {
    setInnerTeamMates(e.target.value);
  };
  const onInitClick = () => {
    dispatch(confirmTeamMates(null));
    dispatch(confirmEnemies(null));
    dispatch(initializePhase());
    dispatch(initializeMe());
    setInnerTeamMates('');
    localStorage.removeItem('teamMates');
    localStorage.removeItem('enemies');
  };

  return (
    <PreEnterInput
      teamMates={teamMates}
      onButtonClick={onButtonClick}
      onInputChange={onInputChange}
      onInitClick={onInitClick}
      innerTeamMates={innerTeamMates}
    />
  );
};

export default PreEnterInputContainer;
