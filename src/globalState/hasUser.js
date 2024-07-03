import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext();



const GlobalStateProvider = ({ children }) => {
 

  const [userLoged, setUserLoged] = useState(false);
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState('');
  const [favourite, setFavourite] = useState(false);

  const updateGlobalVariable = (newValue) => {
    setUserLoged(newValue);
  };

  const updateGlobalUserID = (newValue) => {
    setUserId(newValue);
  };

   const updateGlobalUserEmail = (newValue) => {
    setUserEmail(newValue);
  };

  const updateGlobalFavorite = (newValue) => {
    setFavourite(newValue);
  };


 // console.log(userLoged);
  return (
    <GlobalStateContext.Provider
      value={{ 
        userLoged, updateGlobalVariable, 
        userId, updateGlobalUserID, 
        favourite, updateGlobalFavorite, 
        userEmail, updateGlobalUserEmail
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };