import React, { useEffect, useState } from 'react';
import TeamListViewer from '../../components/preEnter/TeamListViewer';
import { useSelector, useDispatch } from 'react-redux';
import {
  confirmTeamMates,
  changePosition,
  changeMe,
} from '../../modules/teamMates';

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

  const onMeChange = (id) => {
    dispatch(changeMe(id));
  };

  const dragStart = (e) => {
    setDragged(e.target);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragged);
  };

  const dragEnd = (e) => {
    // dragged.style.display = 'block';
    dragged.style.opacity = '1';
    const pholders = document.querySelectorAll('.placeholder');
    pholders.forEach((pholder) => pholder.remove());

    const from = parseInt(dragged?.id);
    const to = parseInt(over?.id);

    if (from === to) {
      return;
    } else if (from < to) {
      const newTeamMates = [
        ...teamMates.slice(0, from),
        ...teamMates.slice(from + 1, to),
        teamMates[to],
        teamMates[from],
        ...teamMates.slice(to + 1),
      ];
      const teamMatesArray = newTeamMates.map((teamMate) => ({
        ...teamMate,
        id: newTeamMates.indexOf(teamMate),
      }));
      dispatch(confirmTeamMates(teamMatesArray));
    } else {
      const newTeamMates = [
        ...teamMates.slice(0, to),
        teamMates[from],
        ...teamMates.slice(to, from),
        ...teamMates.slice(from + 1),
      ];
      const teamMatesArray = newTeamMates.map((teamMate) => ({
        ...teamMate,
        id: newTeamMates.indexOf(teamMate),
      }));
      dispatch(confirmTeamMates(teamMatesArray));
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
    // dragged.style.display = 'none';
    dragged.style.opacity = '0.5';
    if (e.target.className === 'placeholder') return;
    if (e.target.parentNode !== dragged.parentNode) return;
    setOver(e.target);
    e.target.parentNode.insertBefore(placeholder, e.target);
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
      onMeChange={onMeChange}
      dragStart={dragStart}
      dragEnd={dragEnd}
      dragOver={dragOver}
      onPositionClick={onPositionClick}
    />
  );
};

export default TeamListViewerContainer;
