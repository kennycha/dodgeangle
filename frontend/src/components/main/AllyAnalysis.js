import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';
import LineChart from '../common/LineChart';

const AllyAnalysisBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainBackground};
  border: ${2 / 16}rem solid ${mainTheme.mainBorder};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.2rem;
  div {
    font-size: 1.2rem;
    font-weight: bolder;
    color: ${mainTheme.mainFontColor};
  }
  h3 {
    text-align: center;
    color: ${mainTheme.mainFontColor};
    font-weight: bolder;
    margin-bottom: 0;
  }
`;

const AllyAnalysis = ({ teamMatesNotMe }) => {
  return (
    <AllyAnalysisBlock>
      <div>최근 20경기 트롤지수</div>
      {teamMatesNotMe ? (
        teamMatesNotMe.map(
          (teamMate) =>
            teamMate.trollList && (
              <LineChart
                data={teamMate.trollList.map((trollIndex) =>
                  Math.round(trollIndex),
                )}
                label={teamMate.name}
                key={teamMate.id}
              />
            ),
        )
      ) : (
        <h3>정보를 불러오는 중입니다.</h3>
      )}
    </AllyAnalysisBlock>
  );
};

export default AllyAnalysis;
