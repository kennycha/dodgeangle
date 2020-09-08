import React from 'react';
import { Helmet } from 'react-helmet-async';
import PreEnterInputContainer from '../containers/preEnter/PreEnterInputContainer';
import TeamListContainer from '../containers/preEnter/TeamListViewerContainer';
import PreEnterTitleContainer from '../containers/preEnter/PreEnterTitleContainer';

const PreEnterPage = () => {
  return (
    <>
      <Helmet>
        <title>PreEnter | DODGEANGLE</title>
      </Helmet>
      <PreEnterTitleContainer />
      <PreEnterInputContainer />
      <TeamListContainer />
    </>
  );
};

export default PreEnterPage;
