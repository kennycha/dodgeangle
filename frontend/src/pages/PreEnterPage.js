import React from 'react';
import { Helmet } from 'react-helmet-async';
import PreEnterTitle from '../components/preEnter/PreEnterTitle';
import PreEnterInputContainer from '../containers/preEnter/PreEnterInputContainer';
import TeamListContainer from '../containers/preEnter/TeamListViewerContainer';

const PreEnterPage = () => {
  return (
    <>
      <Helmet>
        <title>PreEnter | DODGEANGLE</title>
      </Helmet>
      <PreEnterTitle />
      <PreEnterInputContainer />
      <TeamListContainer />
    </>
  );
};

export default PreEnterPage;
