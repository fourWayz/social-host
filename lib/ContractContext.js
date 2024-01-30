"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getEthersProvider } from './ethers';
const CONTRACT_ABI = require('../variables/abi.json')
const CONTRACT_ADDRESS = require('../variables/address.json')

const ContractContext = createContext();

export function ContractProvider({ children }) {
  const [contract, setContract] = useState(null);
  const [contractAddress, setContractAddress] = useState(CONTRACT_ADDRESS);
  const [contractAbi, setContractAbi] = useState(CONTRACT_ABI);

  useEffect(() => {
    if (!contractAddress || !contractAbi) return;

    const provider = getEthersProvider();
    console.log(provider);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    setContract(contractInstance);
  }, [contractAddress, contractAbi]);

  return (
    <ContractContext.Provider value={{ contract }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  return useContext(ContractContext);
}
