import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const showAlert = (message) => {
    setAlert({ message, type: 'success' });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
}