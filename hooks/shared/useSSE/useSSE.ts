import { useAuthContext } from "@context/Authentication";
import { useCallback, useEffect, useRef, useState } from "react";
import EventSource, { OPEN } from "eventsource";
import { AuthDispatchTypes } from "@context/Authentication/AuthDispatchTypes";

interface SSEOptions {
  onMessage?: (data: any) => void;
  retryOnError?: boolean;
}

export enum CONNECTION_STATE {
  OPENED,
  ERROR,
  CLOSED,
}

function useSSE(subscribeUrl: string, options?: SSEOptions) {
  const connectionRef = useRef<EventSource>();
  const [connectionState, setConnectionState] = useState<CONNECTION_STATE>(
    CONNECTION_STATE.CLOSED
  );
  const {
    accessToken,
    refreshToken,
    dispatch: authDispatch,
    user,
  } = useAuthContext();

  const subscribeToServer = useCallback(() => {
    if (accessToken) {
      const eventSource = new EventSource(
        `${
          process.env.NODE_ENV === "test"
            ? "http://localhost:8000"
            : process.env.NEXT_PUBLIC_BACKEND_URL
        }${subscribeUrl}`,
        {
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: false,
        }
      );
      eventSource.onerror = async (e) => {
        if (e.status === 401) {
          try {
            const REQUEST_ACCESS_TOKEN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/api/token/refresh/`;

            const requestNewAccessToken = await fetch(
              REQUEST_ACCESS_TOKEN_URL,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  refresh: refreshToken,
                }),
              }
            );

            const { access, refresh } = await requestNewAccessToken.json();

            if (!requestNewAccessToken.ok) throw new Error();

            authDispatch({
              type: AuthDispatchTypes.LOGIN,
              payload: {
                accessToken: access,
                refreshToken: refresh,
                remember: !!refresh,
                user,
              },
            });
            return;
          } catch (e) {
            authDispatch({
              type: AuthDispatchTypes.LOGOUT,
            });
            return;
          }
        } else if (e.status) {
          setConnectionState(CONNECTION_STATE.ERROR);
          if (!options?.retryOnError) {
            connectionRef.current = undefined;
            eventSource.close();
            return;
          }
        }
      };
      setConnectionState(CONNECTION_STATE.OPENED);
      connectionRef.current = eventSource;
      return eventSource;
    }
    // accessToken, refreshToken, and user always updates together
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeUrl, options?.retryOnError, accessToken]);

  const unsubscribeFromServer = () => {
    connectionRef.current?.close();
    connectionRef.current = undefined;
    setConnectionState(CONNECTION_STATE.CLOSED);
  };

  useEffect(() => {
    if (!connectionRef.current) {
      subscribeToServer();
    }

    addEventListener("unload", unsubscribeFromServer);

    return () => {
      unsubscribeFromServer();
      removeEventListener("unload", unsubscribeFromServer);
    };
  }, [subscribeToServer]);

  useEffect(() => {
    // this will just replace the onMessage of
    // the existing event source without re-subscribing
    if (connectionRef.current) {
      connectionRef.current.onmessage = (e) => {
        options?.onMessage && options.onMessage(e.data);
      };
    }
  }, [options]);

  return { subscribeToServer, unsubscribeFromServer, connectionState };
}

export default useSSE;
