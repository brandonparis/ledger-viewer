import React, { useState } from 'react';
import Web3 from 'web3';
import PropTypes from 'prop-types';

const Web3ProviderContext = React.createContext();
const Web3ProviderDispatch = React.createContext();

const Web3Provider = ({ children }) => {
  const rpcUrl = 'https://mainnet.infura.io/v3/8b3000bd62ed4efe8835d8fad84f31db';
  const web3Init = new Web3(rpcUrl);
  const [web3, setWeb3] = useState(web3Init);
  return (
    <Web3ProviderContext.Provider value={web3}>
      <Web3ProviderDispatch.Provider value={setWeb3}>{children}</Web3ProviderDispatch.Provider>
    </Web3ProviderContext.Provider>
  );
};

const useWeb3 = () => {
  const context = React.useContext(Web3ProviderContext);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

Web3Provider.propTypes = {
  children: PropTypes.object
};
export { Web3Provider, useWeb3 };
