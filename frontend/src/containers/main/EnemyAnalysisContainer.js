import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EnemyAnalysis from '../../components/main/EnemyAnalysis';

const EnemyAnalysisContainer = () => {
  const { teamMates } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
  }));
  const [rune, setRune] = useState({
    main: null,
    sub: null,
    status: null,
  });

  useEffect(() => {
    teamMates.forEach((teamMate) => {
      if (teamMate.me && teamMate.pick && teamMate.pick.rune !== rune) {
        setRune({
          main: teamMate.pick.rune[0].main,
          sub: teamMate.pick.rune[0].sub,
          status: teamMate.pick.rune[0].status,
        });
      }
    });
  }, [teamMates]);

  return <EnemyAnalysis main={rune.main} sub={rune.sub} status={rune.status} />;
};

export default EnemyAnalysisContainer;
