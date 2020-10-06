import React from 'react';
import styled, { css } from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';
import dotenv from 'dotenv';

dotenv.config();
const URL = process.env.REACT_APP_API_URL;

const EnemyAnalysisBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainBackground};
  border: ${2/16}rem solid ${mainTheme.mainBorder};
`;

const RuneTitleBlock = styled.div`
  color: ${mainTheme.mainAlly};
  margin-top: 0.5rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBlock = styled.div`
  margin: 1rem;
  background: ${mainTheme.mainAnalysis};
  display:flex
`
const RuneBlock = styled.div`
  background: ${mainTheme.mainAnalysis};
  ${(props) =>
    props.status &&
    css`
      margin: 0 1rem 1rem 1rem;
    `}

`;

const RuneRowBlock = styled.div`
  background: ${mainTheme.mainAnalysis};
  display: flex;
  align-items: center;
  justify-content: center;
`

const RuneImg = styled.img`
  background: ${mainTheme.mainBackground};
  height: 4rem;
  width: 4rem;
  margin: 0.5rem 0.75rem;
  border-radius: 100%;
  display: block;
  ${(props) =>
    props.noSelected &&
    css`
      opacity: 0.1;
    `}
  ${(props) =>
    props.four &&
    css`
      margin: 0.5rem ${0.5 / 8}rem;
    `}
  ${(props) =>
    props.five &&
    css`
      height: 2.5rem;
      width: 2.5rem;
      margin: 0.5rem 0.4rem;
    `}
  ${(props) =>
    props.status &&
    css`
      height: 2rem;
      width: 2rem;
      margin: 0.25rem 0.25rem;
    `}
`
// 3 : 마진 4.5 + 크기 12 16.5
// 4 : 마진 0.4 + 크기 16 16.4
// 5 : 마진 4 + 크기 12.5

const RuneTitle = () => {
  return (
    <RuneTitleBlock >추천 룬</RuneTitleBlock>
  );
};

const Rune = ({main, selected, statusSelected}) => {
  const rows = main ? ['0', '1', '2', '3', '4'] : ['0', '2', '3', '4']
  const four = ["11", "21", "24"]
  return (
    <RuneBlock border>
      {rows.map((row) => (
        <RuneRowBlock>
          {row === '0'
            ? ['1','2','3','4','5'].map(col=> (
                <RuneImg
                  src={`${URL}/media/rune/${col}${0}${0}.png`}
                  // src={require(`../../img/rune/${col}${0}${0}.png`)}
                  noSelected={selected[0] !== `${col}`}
                  five
                />
              ))
            : selected[0]+row !== four[0] && selected[0]+row !== four[1] && selected[0]+row !== four[2] 
            ? ['1', '2', '3'].map((col) => (
                <RuneImg
                  src={`${URL}/media/rune/${selected[0]}${row}${col}.png`}
                  // src={require(`../../img/rune/${selected[0]}${row}${col}.png`)}
                  noSelected={selected[row] !== `${col}`}
                />
              ))
            : ['1', '2', '3', '4'].map((col) => (
                <RuneImg
                  src={`${URL}/media/rune/${selected[0]}${row}${col}.png`}
                  // src={require(`../../img/rune/${selected[0]}${row}${col}.png`)}
                  noSelected={selected[row] !== `${col}`}
                  four
                />
              ))}
        </RuneRowBlock>
      ))}
      {!main && <Status selected={statusSelected} />}
    </RuneBlock>
  )
}

const Status = ({selected}) => {
  return (
    <RuneBlock status>
      {['1', '2', '3'].map((row) => (
        <RuneRowBlock status>
          {['1', '2', '3'].map((col) => (
            <RuneImg
              src={require(`../../img/rune/${selected[0]}${row}${col}.png`)}
              noSelected={selected[row] !== `${col}`}
              status
            />
          ))}
        </RuneRowBlock>
      ))}
    </RuneBlock>
  );
}

const EnemyAnalysis = () => {
  return (
    <EnemyAnalysisBlock>
      <RuneTitle />
      <FlexBlock>
        <Rune main selected="12312" />
        <Rune selected="2234" statusSelected="6123"/>
      </FlexBlock>
    </EnemyAnalysisBlock>
  )
};

export default EnemyAnalysis;
