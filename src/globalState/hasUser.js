import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext();



const GlobalStateProvider = ({ children }) => {
 
  const [userLoged, setUserLoged] = useState(false);

  const updateGlobalVariable = (newValue) => {
    setUserLoged(newValue);
  };

  console.log(userLoged);
  return (
    <GlobalStateContext.Provider
      value={{ userLoged, updateGlobalVariable }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };