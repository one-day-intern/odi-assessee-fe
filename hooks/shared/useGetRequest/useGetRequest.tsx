import { useAuthContext } from "@context/Authentication";
import { AuthDispatchTypes } from "@context/Authentication/AuthDispatchTypes";
import { useCallback, useEffect, useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  error?: Error;
}

interface UseGetRequest<T> extends State<T> {
  fetchData: () => Promise<T | FetchError>;
}

interface FetchError extends Error {
  status?: number;
}

interface Options {
  useCache?: boolean;
  requiresToken?: boolean;
  disableFetchOnMount?: boolean;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: FetchError };

function useGetRequest<T = unknown>(
  uri?: string,
  options?: Options
): UseGetRequest<T> {
  const cache = useRef<Cache<T>>({});

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${uri}`;

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload, error: undefined };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const {
    accessToken,
    refreshToken,
    dispatch: authDispatch,
    user,
  } = useAuthContext();

  const fetchData = useCallback(async () => {
    dispatch({ type: "loading" });

    // If a cache exists for this url, return it
    // If token is required, cache is automatically disabled
    if (!options?.requiresToken && options?.useCache && cache.current[url!]) {
      dispatch({ type: "fetched", payload: cache.current[url!] });
      return cache.current[url!];
    }

    if (!options?.requiresToken) {
      if (cancelRequest.current) return;
      const response = await fetch(url!);
      const json = await response.json();

      if (!response.ok) {
        if (cancelRequest.current) return;
        const error: FetchError = new Error(response.statusText);
        error.status = response.status;
        error.message = json?.message;
        dispatch({ type: "error", payload: error as FetchError });
        return;
      }

      cache.current[url!] = json;

      dispatch({ type: "fetched", payload: json });

      return json;
    }

    try {
      const response = await fetch(url!, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        const error: FetchError = new Error(response.statusText);
        const json = await response.json();
        error.status = response.status;
        error.message = json?.message;
        throw error;
      }

      const data = (await response.json()) as T;
      cache.current[url!] = data;
      if (cancelRequest.current) return;

      dispatch({ type: "fetched", payload: data });
      return data;
    } catch (error) {
      if (cancelRequest.current) return;

      if ((error as FetchError)?.status === 401) {
        try {
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
          if (options.disableFetchOnMount) {
            const response = await fetch(url!, {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            });
            const data = (await response.json()) as T;
            cache.current[url!] = data;
            if (cancelRequest.current) return;

            dispatch({ type: "fetched", payload: data });
            return data;
          }
        } catch (e) {
          authDispatch({
            type: AuthDispatchTypes.LOGOUT,
          });
        }
      }
      dispatch({ type: "error", payload: error as FetchError });
      return error as FetchError;
    }
  }, [
    accessToken,
    refreshToken,
    authDispatch,
    url,
    options?.requiresToken,
    options?.useCache,
    options?.disableFetchOnMount,
    user,
  ]);

  useEffect(() => {
    if (!url || options?.disableFetchOnMount) return;

    if (accessToken === "") return;

    if (options?.requiresToken && !accessToken) {
      return;
    }

    cancelRequest.current = false;

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, accessToken, options?.disableFetchOnMount, fetchData]);

  return { ...state, fetchData };
}

export default useGetRequest;
