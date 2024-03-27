import { useState } from "react";

export type AlertType = 'success' | 'info' | 'warning' | 'error';

const useCustomSnackbar = () => {
  const [message, setMessage] = useState<{
    type: AlertType
    text: string;
  }>({
    type: "info",
    text: ""
  });

  const [snackbar, setSnackbar] = useState(false);

  const alertSnackbar = (type: AlertType, text: string) :boolean=> {
    setMessage({
      type,
      text
    })
    setSnackbar(true);

    if(type=="error") return false;

    return true;
  }

  return {
    message,
    setMessage,
    setSnackbar,
    alertSnackbar,
    snackbar
  };
};

export default useCustomSnackbar;
