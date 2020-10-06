import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChampionRecommend from '../../components/main/ChampionRecommend';

const ChampionRecommendContainer = () => {
  const { teamMates, allchampion } = useSelector(
    ({ teamMates, allchampion }) => ({
      teamMates: teamMates.teamMates,
      allchampion: allchampion.allchampion,
    }),
  );
  const me = teamMates.find((teamMate) => teamMate.me);
  useEffect(() => {}, [me.recommendChamp, allchampion]);
  return <ChampionRecommend me={me} allchampion={allchampion} />;
};

export default ChampionRecommendContainer;
