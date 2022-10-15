import { useLocalStorage } from "@hooks/shared/useLocalStorage";

import React, { createContext, ReactNode, useCallback, useEffect, useReducer } from "react";
import { AuthDispatchTypes } from "./AuthDispatchTypes";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

const authReducer = (
  state: AuthState,
  action: AuthDispatchAction
): AuthState => {
  const { type, payload } = action;

  switch (type) {
    case AuthDispatchTypes.LOGIN:
      return {
        ...payload,
        refreshToken: payload.remember ? payload.refreshToken : null,
      };
    case AuthDispatchTypes.LOGOUT:
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        remember: false,
      };
    default:
      return {
        ...state
      };
  }
};


const AuthProvider = ({ children }: AuthProviderProps) => {
  
  const [accessToken, setAccessToken] = useLocalStorage("accessToken");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");
  
  const initialState: AuthState = {
    user: null,
    accessToken: accessToken ?? null,
    refreshToken: refreshToken ?? null,
    remember: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authDispatch = useCallback(({type, payload} : { type: AuthDispatchTypes, payload: AuthState}) => {
    dispatch({type, payload});
    switch (type) {
      case AuthDispatchTypes.LOGIN:
        setAccessToken(payload.accessToken);

        if (payload.remember) setRefreshToken(payload.refreshToken);
        break;
      case AuthDispatchTypes.LOGOUT:
        setAccessToken(null);
        setRefreshToken(null);
        break;
      default:
        break;
      
    }
  }, [setAccessToken, setRefreshToken]);

  useEffect(() => {
    dispatch({
      type: AuthDispatchTypes.LOGIN,
      payload: {
        user: null,
        accessToken,
        refreshToken,
        remember: true
      }
    })
  }, [accessToken, refreshToken, dispatch])


  return (
    <AuthContext.Provider value={{ ...state, dispatch: authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
