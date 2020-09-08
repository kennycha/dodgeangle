import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';

const TeamListViewerBlock = styled(Responsive)`
  background: ${palette.violet[3]};
`;

const TeamListViewer = () => {
  return <TeamListViewerBlock>Team List</TeamListViewerBlock>;
};

export default TeamListViewer;
