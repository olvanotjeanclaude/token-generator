import { RpcMode } from '@/app/types/RPC';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import React, { createContext, useEffect, useMemo, useState } from 'react';

interface IRpc {
  rpcMode: RpcMode;
  rpcUrl: string,
  toggleMode: Function,
  connection: Connection
}

const initialValue: IRpc = {
  rpcMode: "devnet",
  rpcUrl: clusterApiUrl("devnet") as string,
  toggleMode: () => { },
  connection: new Connection(clusterApiUrl("devnet"))
};

export const RpcContext = createContext<IRpc>(initialValue);

export default function RpcContextProvider({ children }: { children: React.ReactNode }) {
  const [rpcMode, setRpcMode] = useState(initialValue.rpcMode);
  const [rpcUrl, setRpcUrl] = useState(initialValue.rpcUrl);
  const [connection, setConnection] = useState(initialValue.connection);

  const toggleMode = () => {
    const mode: RpcMode = rpcMode === "devnet" ? "mainnet" : "devnet";
     setRpcMode(mode);
  }
  
  useEffect(() =>{
    if (rpcMode === "devnet") {
      setRpcUrl(initialValue.rpcUrl);
      setConnection(new Connection(initialValue.rpcUrl))
    }
    else {
      const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS}`;
      setRpcUrl(url);
      setConnection(new Connection(url))
    }
  },[rpcMode]);

  return (
    <RpcContext.Provider value={{
      rpcMode,
      rpcUrl,
      toggleMode,
      connection
    }}>
      {children}
    </RpcContext.Provider>
  );
}
