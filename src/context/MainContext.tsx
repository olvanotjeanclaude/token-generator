import { RpcMode } from '@/app/types/Rpc';
import { clusterApiUrl } from '@solana/web3.js';
import React, { createContext, useEffect, useState } from 'react';

interface IRpc {
  rpcMode: RpcMode;
  rpcUrl: string,
  toggleMode: Function
}

const initialValue: IRpc = {
  rpcMode: "devnet",
  rpcUrl: clusterApiUrl("devnet") as string,
  toggleMode: () => { }
};

export const MainContext = createContext<IRpc>(initialValue);

export default function MainContextProvider({ children }: { children: React.ReactNode }) {
  const [rpcMode, setRpcMode] = useState(initialValue.rpcMode);
  const [rpcUrl, setRpcUrl] = useState(initialValue.rpcUrl);

  const toggleMode = () => {
    const mode: RpcMode = rpcMode === "devnet" ? "mainnet" : "devnet";
    setRpcMode(mode);

    if(mode==="devnet"){
      setRpcUrl(clusterApiUrl("devnet"));
    }
    else{
      setRpcUrl(`https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`);
    }
  }

  return (
    <MainContext.Provider value={{
      rpcMode,
      rpcUrl,
      toggleMode
    }}>
      {children}
    </MainContext.Provider>
  );
}
