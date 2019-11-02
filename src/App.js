import React from 'react';
import { Main } from '@aragon/ui';
import { Web3Provider } from './Web3Context';
import Ledger from './ledger';
const App = () => {
  return (
    <Main>
      <Web3Provider>
        <Ledger />
      </Web3Provider>
    </Main>
  );
};

export default App;
