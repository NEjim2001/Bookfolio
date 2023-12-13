import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const signInUser = userData => {
    setUser(userData);
  };

  const signOutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, signInUser, signOutUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
