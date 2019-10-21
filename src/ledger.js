import React, { useEffect, useState } from 'react';
import { Button } from '@aragon/ui';
import { useWeb3 } from './Web3Context';

const Ledger = props => {
  const [transactions, setTransactions] = useState([]);
  const web3 = useWeb3();
  const getTransactions = async () => {
    let tempArr = [];
    for (let i = 0; i < 10; i++) {
      const trs = await web3.eth.getTransactionFromBlock('latest', i);

      tempArr = [...tempArr, trs];
      console.log(tempArr);
    }
    return setTransactions(tempArr);
  };

  useEffect(() => {
    (async function() {
      await getTransactions();
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Button>Hello world</Button>
        {transactions.map(transaction => (
          <span key={transaction.blockHash}>{transaction.blockHash}</span>
        ))}
      </header>
    </div>
  );
};

export default Ledger;
