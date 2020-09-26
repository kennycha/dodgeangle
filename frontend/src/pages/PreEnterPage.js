import React from 'react';
import { Helmet } from 'react-helmet-async';
import PreEnterTitle from '../components/preEnter/PreEnterTitle';
import PreEnterInputContainer from '../containers/preEnter/PreEnterInputContainer';
import TeamListViewerContainer from '../containers/preEnter/TeamListViewerContainer';
import PreEnterButton from '../components/preEnter/PreEnterButton';
import NavbarContainer from '../containers/common/NavbarContainer';
import styled from 'styled-components';
import mainTheme from '../lib/styles/mainTheme';

const PreEnterBlock = styled.div`
  background: ${mainTheme.mainSummoner};
  height: 100vh;
`;

const PreEnterPage = () => {
  return (
    <>
      <Helmet>
        <title>PreEnter | DODGEANGLE</title>
      </Helmet>
      <PreEnterBlock>
        <PreEnterTitle />
        <PreEnterInputContainer />
        <TeamListViewerContainer />
        <PreEnterButton />
        <NavbarContainer />
      </PreEnterBlock>
    </>
  );
};

export default PreEnterPage;
