import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const Transactions = () => {
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
