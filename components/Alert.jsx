import React, { useContext } from 'react';
import { AlertContext } from './AlertContext';

function Alert() {
  const { alert } = useContext(AlertContext);

  if (!alert) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 rounded-md bg-green-500 text-green-100">
      <p>{alert.message}</p>
    </div>
  );
}

export default Alert;