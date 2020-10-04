import React, { useEffect, useState } from 'react';
import TeamListViewer from '../../components/preEnter/TeamListViewer';
import { useSelector, useDispatch } from 'react-redux';
import { changePosition, switching } from '../../modules/teamMates';

const placeholder = document.createElement('span');
placeholder.className = 'placeholder';

const TeamListViewerContainer = () => {
  const dispatch = useDispatch();
  const [dragged, setDragged] = useState();
  const [over, setOver] = useState();
  const { teamMates, error } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
    error: teamMates.error,
  }));

  const onPositionClick = (e) => {
    const prevOverlay = e.target.parentNode.parentNode.querySelector(
      '.selected',
    );
    prevOverlay.style.display = 'none';
    prevOverlay.classList.remove('selected');

    const overlay = e.target.parentNode.querySelector('div');
    overlay.style.display = 'block';
    overlay.classList.add('selected');

    dispatch(
      changePosition({
        id: parseInt(e.target.parentNode.parentNode.id),
        pos: e.target.parentNode.id,
      }),
    );
  };

  const dragStart = (e) => {
    setDragged(e.target);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragged);
    e.target.style.opacity = '0.5'; // 드레그 중인 div 투명도 증가
  };

  const dragOver = (e) => {
    e.preventDefault();
    let target = e.target;
    // draggable div 탐색
    while (target?.className !== dragged.className) {
      // 타겟이 위쪽 여백(root) or 타겟이 공백(부모노드 찾아가면 root)
      if (target?.id === 'root' || target?.parentNode?.id === 'root') {
        // 스타일링할 over가 존재하고, 그 over가 dragged와 같지 않다면
        if (over && over !== dragged) {
          over.style.opacity = '1';
        }
        setOver();
        return;
      }
      target = target.parentNode;
    }

    // 스타일링할 over가 존재하고, 그 over가 dragged와 같이 않고, 현재 타겟과 같지 않으면
    if (over && over !== dragged && over !== target) {
      over.style.opacity = '1';
    }
    target.style.opacity = '0.5';
    setOver(target); // Over에 타겟 저장
  };

  const dragEnd = (e) => {
    dragged.style.opacity = '1'; // 드레그 끝난 div 투명도 원상 복귀

    if (!over) return; // 여백에서 멈췄으면 => 아무 동작 X
    over.style.opacity = '1'; // 드레그 타겟인 div 투명도 원상 복귀
    const fromId = parseInt(dragged.id); // ? 삭제 => 없으면 로직 오류임
    const toId = parseInt(over.id); // ? 삭제 => 없으면 로직 오류임

    if (fromId === toId) return;
    dispatch(switching({ fromId, toId }));
  };

  useEffect(() => {
    const overlays = Array.from(document.querySelectorAll('.overlay'));
    overlays.forEach((overlay) => {
      overlay.style.display = 'none';
    });

    const selectedPositions = Array.from(
      document.querySelectorAll('.selected'),
    );
    selectedPositions.forEach((selectedPosition) => {
      const selectedOverlay = selectedPosition.parentNode.querySelector('div');
      selectedOverlay.style.display = 'block';
    });
  }, [teamMates, dispatch]);

  return (
    <TeamListViewer
      teamMates={teamMates}
      error={error}
      dragStart={dragStart}
      dragEnd={dragEnd}
      dragOver={dragOver}
      onPositionClick={onPositionClick}
    />
  );
};

export default TeamListViewerContainer;
