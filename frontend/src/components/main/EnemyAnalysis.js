import React from 'react';
import styled, { css } from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';
import dotenv from 'dotenv';

dotenv.config();
const URL = process.env.REACT_APP_API_URL;

const EnemyAnalysisBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainBackground};
  border: ${2 / 16}rem solid ${mainTheme.mainBorder};
`;

const RuneTitleBlock = styled.div`
  color: ${mainTheme.mainFontColor};
  width: 100%;
  margin-top: 0.8rem;
  margin-bottom: 1.8rem;
  font-size: 1.2rem;
  font-weight: bolder;
  text-align: center;
`;

const FlexBlock = styled.div`
  margin: 1rem;
  background: ${mainTheme.mainAnalysis};
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  /* align-items: center; */
  justify-content: center;
`;
const RuneBlock = styled.div`
  background: ${mainTheme.mainAnalysis};
  margin-top: 2rem;
  padding: 0.3rem;
  ${(props) =>
    props.status &&
    css`
      /* margin: 0 1rem 1rem 1rem; */
    `}
`;

const RuneRowBlock = styled.div`
  background: ${mainTheme.mainAnalysis};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RuneImg = styled.img`
  background: ${mainTheme.mainBackground};
  height: 3.5rem;
  width: 3.5rem;
  margin: 0.5rem 0.75rem;
  border-radius: 100%;
  display: block;
  ${(props) =>
    props.noSelected &&
    css`
      opacity: 0.15;
    `}
  ${(props) =>
    props.four &&
    css`
      margin: 0.5rem ${0.5 / 8}rem;
    `}
  ${(props) =>
    props.five &&
    css`
      height: 2.2rem;
      width: 2.2rem;
      margin: 0.5rem 0.2rem;
    `}
  ${(props) =>
    props.status &&
    css`
      height: 3rem;
      width: 3rem;
      margin: 0.25rem 0.25rem;
    `}
`;
// 3 : 마진 4.5 + 크기 12 16.5
// 4 : 마진 0.4 + 크기 16 16.4
// 5 : 마진 4 + 크기 12.5

const RuneTitle = () => {
  return <RuneTitleBlock>추천 룬</RuneTitleBlock>;
};

const Rune = ({ main, selected, statusSelected }) => {
  const rows = main ? [0, 1, 2, 3, 4] : [0, 2, 3, 4];
  const four = ['11', '21', '24'];
  return (
    <RuneBlock border>
      {rows.map((row) => (
        <RuneRowBlock key={row}>
          {row === 0
            ? [1, 2, 3, 4, 5].map((col) => (
                <RuneImg
                  key={row*10+col}
                  src={`${URL}/media/rune/${col}${0}${0}.png`}
                  // src={require(`../../img/rune/${col}${0}${0}.png`)}
                  noSelected={parseInt(selected[0]) !== col}
                  five
                />
              ))
            : selected[0] + row.toString() !== four[0] &&
              selected[0] + row.toString() !== four[1] &&
              selected[0] + row.toString() !== four[2]
            ? [1, 2, 3].map((col) => (
                <RuneImg
                  key={row*10+col}
                  src={`${URL}/media/rune/${selected[0]}${row}${col}.png`}
                  // src={require(`../../img/rune/${selected[0]}${row}${col}.png`)}
                  noSelected={parseInt(selected[row]) !== col}
                />
              ))
            : [1, 2, 3, 4].map((col) => (
                <RuneImg
                  key={row*10+col}
                  src={`${URL}/media/rune/${selected[0]}${row}${col}.png`}
                  // src={require(`../../img/rune/${selected[0]}${row}${col}.png`)}
                  noSelected={parseInt(selected[row]) !== col}
                  four
                />
              ))}
        </RuneRowBlock>
      ))}
      {!main && <Status selected={statusSelected} />}
    </RuneBlock>
  );
};

const Status = ({ selected }) => {
  return (
    <RuneBlock status>
      {[1, 2, 3].map((row) => (
        <RuneRowBlock status key={row}>
          {[1, 2, 3].map((col) => (
            <RuneImg
              key={row*10+col}
              src={`${URL}/media/rune/${6}${row}${col}.png`}
              // src={require(`../../img/rune/${selected[0]}${row}${col}.png`)}
              noSelected={parseInt(selected[row - 1]) !== col}
              status
            />
          ))}
        </RuneRowBlock>
      ))}
    </RuneBlock>
  );
};

const EnemyAnalysis = ({ mainSelected, subSelected, statusSelected }) => {
  return (
    <EnemyAnalysisBlock>
      <RuneTitle />
      <FlexBlock>
        <Rune main selected={mainSelected} />
        <Rune selected={subSelected} statusSelected={statusSelected} />
      </FlexBlock>
    </EnemyAnalysisBlock>
  );
};

export default EnemyAnalysis;
