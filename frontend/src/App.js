import React from 'react';
import { Route } from 'react-router-dom';
import PreEnterPage from './pages/PreEnterPage';
import { Helmet } from 'react-helmet-async';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <Helmet>
        <title>DODGEANGLE</title>
      </Helmet>
      <Route component={PreEnterPage} path={'/'} exact />
      <Route component={MainPage} path={'/main'} />
    </>
  );
}

export default App;
