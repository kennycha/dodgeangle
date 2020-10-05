import React from 'react';
import styled, { css } from 'styled-components';
import ChampionByPositionContainer from '../../containers/main/ChampionByPositionContainer';
import ChampionInputContainer from '../../containers/main/ChampionInputContainer';
import ChampionListContainer from '../../containers/main/ChampionListContainer';
import mainTheme from '../../lib/styles/mainTheme';

const ChampionPickerBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${mainTheme.mainBackground};
  position: relative;
  ${(props) =>
    props.phase === 'ban'
      ? css`
          background: linear-gradient(
            ${mainTheme.mainBan},
            ${mainTheme.mainBackground}
          );
        `
      : props.phase === 'pick'
      ? css`
          background: linear-gradient(
            ${mainTheme.mainPick},
            ${mainTheme.mainBackground}
          );
        `
      : css`
          background: linear-gradient(
            ${mainTheme.mainSummoner},
            ${mainTheme.mainBackground}
          );
        `}
`;

const Spliter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${mainTheme.mainBorder};
`;

const PhaseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${100 / 16}rem;
  width: ${100 / 16}rem;
  color: ${mainTheme.mainLogoColor};
  font-size: 1.25rem;
  border: 2px solid ${mainTheme.mainLogoColor};
  border-radius: 100%;
  position: absolute;
  right: 50px;
  top: 600px;
  z-index: 10;
  cursor: pointer;
  ${(props) =>
    props.phase === 'ban'
      ? css`
          background: ${mainTheme.mainBan};
        `
      : props.phase === 'pick'
      ? css`
          background: ${mainTheme.mainPick};
        `
      : css`
          background: ${mainTheme.mainSummoner};
          cursor: not-allowed;
        `}
`;

const ChampionPicker = ({
  allChampions,
  resultChampions,
  setResultChampions,
  selectedChampion,
  setSelectedChampion,
  phase,
  onPhaseBtnClick,
}) => {
  return (
    <ChampionPickerBlock phase={phase}>
      {allChampions && (
        <>
          <Spliter>
            <ChampionByPositionContainer
              allChampions={allChampions}
              setResultChampions={setResultChampions}
            />
            <ChampionInputContainer
              allChampions={allChampions}
              setResultChampions={setResultChampions}
            />
          </Spliter>
          <PhaseBtn onClick={onPhaseBtnClick} phase={phase}>
            {phase === 'ban'
              ? '벤 완료'
              : phase === 'pick'
              ? '픽 완료'
              : '완료'}
          </PhaseBtn>
          <ChampionListContainer
            resultChampions={resultChampions}
            selectedChampion={selectedChampion}
            setSelectedChampion={setSelectedChampion}
          />
        </>
      )}
    </ChampionPickerBlock>
  );
};

export default ChampionPicker;
