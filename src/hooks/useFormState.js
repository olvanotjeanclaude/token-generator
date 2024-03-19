import { useState } from "react";

const useFormState = () => {
    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [response,setResonse] = useState("");

    const resetState=() =>{
        setErrors("");
        setIsLoading(false);
        setIsError(false);
        setResonse("");
    }

    return {
        errors, setErrors,
        isLoading, setIsLoading,
        isError, setIsError,
        response, setResonse,
        resetState
    }
}

export default useFormState;