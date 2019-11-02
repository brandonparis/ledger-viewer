import React, { useEffect, useState } from 'react';
import { Card, Text, IconPlus, IconRemove } from '@aragon/ui';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import styled from 'styled-components';

import { useWeb3 } from './Web3Context';

const BlockContainer = styled(Card).attrs(attrs => ({
  ...attrs,
  value: attrs.value,
}))`
  display: grid;
  grid-template-columns: 80% auto;
  grid-template-rows: repeat(3, 1fr);
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
  const [expandHash, setHashExpanded] = useState({});
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

  const getTransactions = async (e, block) => {
    console.log(e.target.id);
    if (e.target.id === 'hashVal') return;
    console.log(open[block]);
    if (open[block]) {
      return setOpen({
        ...open,  
        [block]: false,
      })
    }
    setOpen({
      ...open,  
      [block]: true,
    });
    const blockDetails = await web3.eth.getBlock(block, true);
    setTransactions(
      blockDetails.transactions.filter((trans) => trans.value > 0).slice(0, 10)
    );
  }

  return (
    <div>
        <div>
          {blocks.map(block => (
            <>
            <BlockContainer title='Get transaction details' onClick={(e) => getTransactions(e, block.hash)} value={block.hash} key={block.hash}>
              <div>
                <CardHeader>Block number</CardHeader>
                <Text color='black'>{block.number}</Text>
              </div>
              {
                open[block.hash] ?
                  <FaChevronDown title='Close transaction details' /> :
                  <FaChevronRight title='Get transaction details' />
              }
              <div>
                <CardHeader>Hash</CardHeader>
                <Text title='Click to see full hash' id='hashVal' color='black' onClick={() => setHashExpanded({[block.hash]: !expandHash[block.hash]})}>
                  {expandHash[block.hash] ? block.hash : `${block.hash.substring(0, 8)}...`}
                </Text>
              </div>
              <span style={{gridArea: '3/1/3/2'}}>Click to see transactions...</span>
            </BlockContainer>
            <div hidden={!open[block.hash]}>
              {transactions.map(trans => (
                  <BlockContainer value={trans.hash} key={trans.hash}>
                      <div>
                        <CardHeader>Transaction hash</CardHeader>
                        <Text color='black'>{`${trans.hash.substring(0, 8)}...` }</Text>
                      </div>
                      <div></div>
                      <div>
                        <CardHeader>Ether sent</CardHeader>
                        <Text color='black'>{trans.value}</Text>
                      </div>
                  </BlockContainer>
                ))}
              </div>
            </>
          ))}
          
        </div>
    </div>
  );
};

export default Ledger;
