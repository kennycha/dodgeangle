import React from 'react';
import EnemyAnalysis from '../../components/main/EnemyAnalysis';

const EnemyAnalysisContainer = () => {
  // 샘플
  const mainSelected = "12312"
  const subSelected = "2234"
  const statusSelected = "6123"
  return (
    <EnemyAnalysis
     mainSelected={mainSelected}
     subSelected={subSelected}
     statusSelected={statusSelected}
    />
  )
};

export default EnemyAnalysisContainer;
