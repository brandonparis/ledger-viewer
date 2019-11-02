import React, { useEffect, useState } from 'react';
import { Card, Text } from '@aragon/ui';
import styled from 'styled-components';

import { useWeb3 } from './Web3Context';

const BlockContainer = styled(Card).attrs((attrs) => ({
  ...attrs,
  value: attrs.value,
}))`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  height: auto;
  width: 50vw;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: hsl(250, 90%, 90%);
    cursor: pointer;
  }
`

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
    setOpen({
      hash: !open.hash,
    });
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
              <Text color='black'>{block.number}</Text>
              </div>
              <div>
              <Text color='black'>{block.hash}</Text>
              </div>
            </BlockContainer>
            <div hidden={!open.hash}>
              {
                transactions.map(trans => (
                  <BlockContainer value={trans.hash} key={trans.hash}>
                    <div>
                    <Text color='black'>{block.number}</Text>
                    </div>
                  </BlockContainer>
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
