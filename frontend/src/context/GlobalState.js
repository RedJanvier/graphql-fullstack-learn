import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducers';

const initialState = {
  token: null,
  tokenExpires: 0,
  userId: null,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function login(payload) {
    dispatch({
      type: 'LOGIN_USER',
      payload,
    });
  }

  function logout() {
    dispatch({
      type: 'LOGOUT_USER',
      payload: initialState,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        tokenExpires: state.tokenExpires,
        userId: state.userId,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
