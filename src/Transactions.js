import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Main } from '@aragon/ui';
import { Button } from '@aragon/ui';
import Web3 from 'web3';
import ganache from 'ganache-core';
import './App.css';

const Transactions = () => {
  const [transactions, set] = useState(false);
  const rpcUrl = 'https://mainnet.infura.io/v3/8b3000bd62ed4efe8835d8fad84f31db';
  const web3 = new Web3(rpcUrl);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    console.log(await web3.eth.getTransactionFromBlock('latest', 2));
  };
  return (
    <div>
      <span>
        {}
      </span>
    </div>
  );
};

export default Transactions;
