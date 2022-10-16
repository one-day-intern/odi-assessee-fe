import { useLocalStorage } from "@hooks/shared/useLocalStorage";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
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
        ...payload!,
        refreshToken: payload?.remember ? payload?.refreshToken : null,
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
        ...state,
      };
  }
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");
  const [isLoading, setIsLoading] = useState(true);

  const initialState: AuthState = {
    user: null,
    accessToken: accessToken ?? null,
    refreshToken: refreshToken ?? null,
    remember: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authDispatch = useCallback(
    ({ type, payload }: AuthDispatchAction) => {
      dispatch({ type, payload });
      switch (type) {
        case AuthDispatchTypes.LOGIN:
          setAccessToken(payload.accessToken);

          if (payload.remember) {
            setRefreshToken(payload.refreshToken);
          } else {
            setRefreshToken(null);
          }
          break;
        case AuthDispatchTypes.LOGOUT:
          setAccessToken(null);
          setRefreshToken(null);
          break;
        default:
          break;
      }
    },
    [setAccessToken, setRefreshToken]
  );

  useEffect(() => {
    if (accessToken === "") return;

    if (accessToken == null) {
      setIsLoading(false);
      return;
    }

    const initialLogin = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get-info/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const user = await response.json();


      if (!response.ok) {
        if (response.status === 401) {
          const REQUEST_ACCESS_TOKEN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/api/token/refresh/`;

          const requestNewAccessToken = await fetch(REQUEST_ACCESS_TOKEN_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          });

          if (!requestNewAccessToken.ok) {
            dispatch({
              type: AuthDispatchTypes.LOGOUT,
              payload: {
                user: null,
                accessToken: null,
                refreshToken: null,
                remember: false,
              },
            });
            setIsLoading(false);
            return;
          }

          const { access, refresh } = await requestNewAccessToken.json()

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get-info/`,
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );

          const user = await response.json();

          authDispatch({
            type: AuthDispatchTypes.LOGIN,
            payload: {
              user,
              accessToken: access,
              refreshToken: refresh,
              remember: !!refresh,
            },
          });
          return;
        } else {
          setIsLoading(false);
          return;
        }
      }

      authDispatch({
        type: AuthDispatchTypes.LOGIN,
        payload: {
          user,
          accessToken,
          refreshToken,
          remember: !!refreshToken,
        },
      });
      setIsLoading(false);
    };

    initialLogin();
  }, [accessToken, refreshToken, authDispatch]);

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch: authDispatch, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
