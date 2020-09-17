import React from 'react';
import { Helmet } from 'react-helmet-async';
import PreEnterTitle from '../components/preEnter/PreEnterTitle';
import PreEnterInputContainer from '../containers/preEnter/PreEnterInputContainer';
import TeamListViewerContainer from '../containers/preEnter/TeamListViewerContainer';
import PreEnterButton from '../components/preEnter/PreEnterButton';

const PreEnterPage = () => {
  return (
    <>
      <Helmet>
        <title>PreEnter | DODGEANGLE</title>
      </Helmet>
      <PreEnterTitle />
      <PreEnterInputContainer />
      <TeamListViewerContainer />
      <PreEnterButton />
    </>
  );
};

export default PreEnterPage;
