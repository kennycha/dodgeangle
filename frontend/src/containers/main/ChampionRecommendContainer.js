import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChampionRecommend from '../../components/main/ChampionRecommend';

const ChampionRecommendContainer = () => {
  const { teamMates, allchampion, dodgeAngle } = useSelector(
    ({ teamMates, allchampion, dodgeAngle }) => ({
      teamMates: teamMates.teamMates,
      allchampion: allchampion.allchampion,
      dodgeAngle: dodgeAngle.dodgeAngle,
    }),
  );
  const me = teamMates.find((teamMate) => teamMate.me);
  useEffect(() => {}, [me.recommendChamp, allchampion, dodgeAngle]);
  return (
    <ChampionRecommend
      me={me}
      allchampion={allchampion}
      dodgeAngle={dodgeAngle}
    />
  );
};

export default ChampionRecommendContainer;
