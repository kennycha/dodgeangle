import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';
import LineChart from '../common/LineChart';

const AllyAnalysisBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainAnalysis};
  border: ${2 / 16}rem solid ${mainTheme.mainBorder};
`;

const AllyAnalysis = ({ teamMatesNotMe }) => {
  return (
    <AllyAnalysisBlock>
      {teamMatesNotMe &&
        teamMatesNotMe.map(
          (teamMate) =>
            teamMate.trollList && (
              <LineChart
                data={teamMate.trollList}
                label={teamMate.name}
                key={teamMate.id}
              />
            ),
        )}
      {!teamMatesNotMe && <div>Loading...</div>}
    </AllyAnalysisBlock>
  );
};

export default AllyAnalysis;
