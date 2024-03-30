import { RPC } from "@/app/types/RPC";
import useRpcContext from "./useRpcContext";

const useRpc = (): RPC => {
    const { rpcMode, rpcUrl, connection } =useRpcContext()
  
    return {
        mode: rpcMode,
        url: rpcUrl,
        connection
    }
}

export default useRpc;