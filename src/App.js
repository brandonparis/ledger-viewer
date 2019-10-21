import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Main } from '@aragon/ui';
import { Button } from '@aragon/ui';
import { Web3Provider, useWeb3 } from './Web3Context';
import './App.css';

const App = () => {
  const [transactions, set] = useState(false);
  const web3 = useWeb3();
  const getAccounts = async () => {
    console.log(await web3.eth.getTransactionFromBlock('latest', 2));
  };
  return (
    <Main>
      <Web3Provider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <Button>Hello world</Button>
            Learn React
          </header>
        </div>
      </Web3Provider>
    </Main>
  );
};

export default App;
