import { useState } from "react";

const useFormState = () => {
    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [response,setResponse] = useState("");

    const resetState=() =>{
        setErrors("");
        setIsLoading(false);
        setIsError(false);
        setResponse("");
    }

    return {
        errors, setErrors,
        isLoading, setIsLoading,
        isError, setIsError,
        response, setResponse,
        resetState
    }
}

export default useFormState;