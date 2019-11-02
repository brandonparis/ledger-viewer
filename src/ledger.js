import React, { useEffect, useState } from 'react';
import { Card, Text, IconPlus, IconRemove } from '@aragon/ui';
import styled from 'styled-components';

import { useWeb3 } from './Web3Context';

const BlockContainer = styled(Card).attrs((attrs) => ({
  ...attrs,
  value: attrs.value,
}))`
  display: grid;
  grid-template-columns: 80% auto;
  margin: 1rem auto;
  height: auto;
  width: 60vw;
  padding: 1rem;
  cursor: pointer;
  justify-content: space-between;
  &:hover {
    background-color: hsl(250, 90%, 90%);
    cursor: pointer;
  }
`;

const TransactionContainer = styled(BlockContainer)`
  width: 50vw;
  margin-top: -1rem
`;

const CardHeader = styled.h3`
  font-weight: bold;
  display: inline;
  margin-right: 1rem;
`;

const Ledger = props => {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState({});
  const web3 = useWeb3();
  const getBlocks = async () => {
    let tempArr = [];
    const latest = await web3.eth.getBlockNumber();
    for (let i = 0; i< 10; i++) {
      tempArr.push(await web3.eth.getBlock(latest - i));
    }    
    return setBlocks(tempArr);
  };

  useEffect(() => {
    (async function() {
      await getBlocks();
    })();
  }, []);

  const getTransactions = async (hash) => {
    console.log(hash);
    if (open.hash) {
      return setOpen({
        ...open,
        [hash]: false,
      })
    }
    setOpen({
      ...open,  
      [hash]: !open[hash],
    });
    console.log(open);
    const block = await web3.eth.getBlock(hash, true);
    setTransactions(
      block.transactions.filter((trans) => trans.value > 0).slice(0, 10)
    );
  }

  console.log(transactions);

  return (
    <div>
        <div>
          {blocks.map(block => (
            <>
            <BlockContainer onClick={() => getTransactions(block.hash)} value={block.hash} key={block.hash}>
              <div>
                <CardHeader>Block number</CardHeader>
                <Text color='black'>{block.number}</Text>
              </div>
              {
                open[block.hash] ?
                  <IconRemove/> :
                  <IconPlus />
              }
              <div>
                <CardHeader>Hash</CardHeader>
                <Text color='black'>{block.hash}</Text>
              </div>
            </BlockContainer>
            <div hidden={!open[block.hash]}>
              {
                transactions.map(trans => (
                  <TransactionContainer value={trans.hash} key={trans.hash}>
                      <div>
                        <CardHeader>Transaction hash</CardHeader>
                        <Text color='black'>{trans.hash}</Text>
                      </div>
                      <div>
                        <CardHeader>Ether sent</CardHeader>
                        <Text color='black'>{trans.value}</Text>
                      </div>
                  </TransactionContainer>
                ))
              }
            </div>
            </>
          ))}
          
        </div>
    </div>
  );
};

export default Ledger;
