import { useState } from "react";

const useCustomSnackbar = () =>{
    const [message, setMessage] = useState({
        type: null,
        text: null
      });
      const [snackbar, setSnackbar] = useState(false);

      return {
        message,
        setMessage,
        setSnackbar,
        snackbar
      };
};

export default useCustomSnackbar;