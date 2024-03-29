import useMainContext from "./useMainContext"

const useRpc = () => {
    const { rpcMode, rpcUrl } = useMainContext();

    return {
        rpcMode,
        rpcUrl
    };
}

export default useRpc;