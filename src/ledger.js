import React, { useEffect, useState } from 'react';
import { Card, Text, IconPlus, IconRemove } from '@aragon/ui';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { numToReadableString } from './utils/utils';
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
  margin-top: -1rem;
  word-break: break-all;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr auto;
  margin: 1rem 19.2rem;
  &:hover {
    background-color: hsl(250, 80%, 80%);
    cursor: default;
  }
`;

const CardHeader = styled.h3`
  font-weight: bold;
  display: inline;
  margin-right: 1rem;
`;

const TransactionHeader = styled.h4`
  font-weight: bold;
  display: inline;
  margin-right: 1rem;
`;

const DisplayText = styled(Text)`
  font-size: 0.85rem;
  color: hsl(255, 90%, 10%);
`;

const Ledger = props => {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState({});
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
    if (e.target.id === 'hashVal') return;
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
    setTransactions({
      ...transactions,
      [block]: blockDetails.transactions.filter((trans) => trans.value > 0).slice(0, 10),
    });
  }
  return (
    <div>
        <div>
          {blocks.map(block => (
            <>
            <BlockContainer title='Get transaction details' onClick={(e) => getTransactions(e, block.hash)} value={block.hash} key={block.hash}>
              <div>
                <CardHeader>Block number</CardHeader>
                <DisplayText>{block.number}</DisplayText>
              </div>
              {
                open[block.hash] ?
                  <FaChevronDown title='Close transaction details' /> :
                  <FaChevronRight title='Get transaction details' />
              }
              <div>
                <CardHeader>Hash</CardHeader>
                <DisplayText title='Click to see full hash' id='hashVal' color='black' onClick={() => setHashExpanded({[block.hash]: !expandHash[block.hash]})}>
                  {expandHash[block.hash] ? block.hash : `${block.hash.substring(0, 8)}...`}
                </DisplayText>
              </div>
              <span style={{gridArea: '3/1/3/2'}}>Click to see transactions...</span>
            </BlockContainer>
            <div hidden={!open[block.hash]}>
              {transactions[block.hash] && transactions[block.hash].map(trans => (
                  <TransactionContainer value={trans.hash} key={trans.hash}>
                      <div>
                        <TransactionHeader>Hash</TransactionHeader>
                        <DisplayText onClick={() => setHashExpanded({[trans.hash]: !expandHash[trans.hash]})}>
                        {expandHash[trans.hash] ? trans.hash : `${trans.hash.substring(0, 8)}...`}
                        </DisplayText>
                      </div>
                      <div></div>
                      <div>
                        <TransactionHeader>Ether sent</TransactionHeader>
                        <DisplayText>{`${numToReadableString(web3.utils.fromWei(trans.value, 'milliether'))} (Milli)ether`}</DisplayText>
                      </div>
                  </TransactionContainer>
                ))}
              </div>
            </>
          ))}
          
        </div>
    </div>
  );
};

export default Ledger;
