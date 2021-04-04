import React from 'react';

import Header from './component/Header';
import Main from './component/Main';
import StoreProvider from './store/StoreProvider';
import './App.scss';

const App = () => (
  <StoreProvider>
    <Header />
    <Main />
  </StoreProvider>
);

export default App;