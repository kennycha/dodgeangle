import React from 'react';
import { Helmet } from 'react-helmet-async';
import PreEnterTitle from '../components/preEnter/PreEnterTitle';
import PreEnterInputContainer from '../containers/preEnter/PreEnterInputContainer';
import TeamListContainer from '../containers/preEnter/TeamListViewerContainer';
import PreEnterButton from '../components/preEnter/PreEnterButton';

const PreEnterPage = () => {
  return (
    <>
      <Helmet>
        <title>PreEnter | DODGEANGLE</title>
      </Helmet>
      <PreEnterTitle />
      <PreEnterInputContainer />
      <TeamListContainer />
      <PreEnterButton />
    </>
  );
};

export default PreEnterPage;
