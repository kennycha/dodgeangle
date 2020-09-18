import React from 'react';
import { Route } from 'react-router-dom';
import PreEnterPage from './pages/PreEnterPage';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
      <Helmet>
        <title>DODGEANGLE</title>
      </Helmet>
      <Route component={PreEnterPage} path={'/'} exact />
    </>
  );
}

export default App;
