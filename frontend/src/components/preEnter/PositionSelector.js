import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const PositionItemBlock = styled.div`
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PositionItem = styled.div`
  display: relative;
`;

const PositionOverlay = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 100%;
  position: absolute;
  background-color: ${palette.black};
  opacity: 0.7;
  display: none;
`;

const PositionImg = styled.img`
  height: 80px;
  width: 80px;
  margin-right: 1rem;
  border-radius: 100%;
`;

const PositionSelector = ({ teamMate, onPositionClick }) => {
  const positions = ['top', 'jgl', 'mid', 'adc', 'sup'];

  return (
    <PositionItemBlock id={teamMate.id} draggable={false}>
      {positions.map((position) =>
        position === teamMate.pos ? (
          <PositionItem id={position} key={position}>
            <PositionOverlay className="overlay selected" draggable={false} />
            <PositionImg
              src={require(`../../img/positions/${position}.png`)}
              draggable={false}
              onClick={onPositionClick}
            />
          </PositionItem>
        ) : (
          <PositionItem id={position} key={position}>
            <PositionOverlay className="overlay" draggable={false} />
            <PositionImg
              src={require(`../../img/positions/${position}.png`)}
              draggable={false}
              onClick={onPositionClick}
            />
          </PositionItem>
        ),
      )}
    </PositionItemBlock>
  );
};

export default PositionSelector;
