import React, { useState } from 'react';
import TeamListViewer from '../../components/preEnter/TeamListViewer';
import { useSelector, useDispatch } from 'react-redux';
import { confirmTeamMates, changePosition } from '../../modules/teamMates';

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

  const onSelectChange = (e) => {
    dispatch(
      changePosition({ id: parseInt(e.target.id), pos: e.target.value }),
    );
  };

  const dragStart = (e) => {
    setDragged(e.target);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', dragged);
  };

  const dragEnd = (e) => {
    // dragged.style.display = 'block';
    dragged.style.opacity = '1';
    if (dragged.parentNode !== over?.parentNode) {
      return;
    }
    dragged.parentNode.removeChild(placeholder);

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
        id: newTeamMates.indexOf(teamMate),
        name: teamMate.name,
        pos: teamMate.pos,
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
        id: newTeamMates.indexOf(teamMate),
        name: teamMate.name,
        pos: teamMate.pos,
      }));
      dispatch(confirmTeamMates(teamMatesArray));
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
    // dragged.style.display = 'none';
    dragged.style.opacity = '0.5';
    if (e.target.className === 'placeholder') return;
    setOver(e.target);
    e.target.parentNode.insertBefore(placeholder, e.target);
  };

  return (
    <TeamListViewer
      teamMates={teamMates}
      error={error}
      onSelectChange={onSelectChange}
      dragStart={dragStart}
      dragEnd={dragEnd}
      dragOver={dragOver}
    />
  );
};

export default TeamListViewerContainer;
