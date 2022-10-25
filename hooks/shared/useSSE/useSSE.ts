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
