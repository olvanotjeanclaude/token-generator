import { RpcContext } from "@/context/RpcContext";
import { useContext } from "react";

const useRpcContext = () => useContext(RpcContext);

export default useRpcContext;