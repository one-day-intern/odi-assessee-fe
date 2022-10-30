import { useAuthContext } from "@context/Authentication";
import { AuthDispatchTypes } from "@context/Authentication/AuthDispatchTypes";
import { useEffect, useReducer, useRef } from "react";

interface State<T, V> {
  data?: V;
  error?: PostError;
  status?: "loading" | "fetched" | "error" | "initial";
  postData?: (postBody: T) => void;
}

interface PostError extends Error {
  status?: number;
}

interface Options {
  requiresToken?: boolean;
}

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

// T is the type of the post body, V is the type returned from fetch request
function usePostRequest<T, V>(
  uri: string,
  options?: Options
): State<T,V> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${uri}`;
  const {
    user,
    accessToken,
    refreshToken,
    dispatch: authDispatch,
    remember,
  } = useAuthContext();

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T,V> = {
    error: undefined,
    data: undefined,
    status: "initial",
  };

  useEffect(() => {
    cancelRequest.current = false;

    return () => {
      cancelRequest.current = true;
    }
  })

  // Keep state logic separated
  const fetchReducer = (state: State<T,V>, action: Action<V>): State<T,V> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, status: "loading" };
      case "fetched":
        return { ...initialState, data: action.payload, status: "fetched" };
      case "error":
        return { ...initialState, error: action.payload, status: "error" };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const postData = async (postBody: T) => {
    dispatch({ type: "loading" });

    // Directly post data if doesn't require token
    if (!options?.requiresToken) {
      if (cancelRequest.current) return;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(postBody),
      });
      const json = await response.json();

      if (!response.ok) {
        if (cancelRequest.current) return;
        const error: PostError = new Error(response.statusText);
        error.message = json.detail ?? json.message;
        error.status = response.status;

        dispatch({
          type: "error",
          payload: error as PostError,
        });
        return;
      }


      dispatch({
        type: "fetched",
        payload: json,
      });
      return;
    }

    try {

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postBody)
      });

      const data = await response.json();

      if (!response.ok) {
        const error: PostError = new Error(response.statusText);
        error.message = data?.message;
        error.status = response.status;
        throw error;
      }

      if (cancelRequest.current) return;

      dispatch({
        type: "fetched",
        payload: data as V,
      });
    } catch (error) {
      if (cancelRequest.current) return;

      if ((error as PostError)?.status === 401) {
        const REQUEST_ACCESS_TOKEN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/api/token/refresh/`;

        try {
          const tokenResponse = await fetch(REQUEST_ACCESS_TOKEN_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          });

          if (!tokenResponse.ok) throw new Error();

          const { access, refresh } = await tokenResponse.json();

          authDispatch({
            type: AuthDispatchTypes.LOGIN,
            payload: {
              user,
              accessToken: access,
              refreshToken: refresh,
              remember: !!refresh,
            },
          });

          const response = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${access}`
            },
            method: "POST",
            body: JSON.stringify(postBody),
          });
          const json = await response.json();


          if (!response.ok) {
            const error: PostError = new Error(response.statusText);
            error.message = json.detail ?? json.message;
            error.status = response.status;
            dispatch({
              type: "error",
              payload: error as PostError,
            });
            return;
          }

          dispatch({
            type: "fetched",
            payload: json as V
          })

          return;
        } catch (err) {
          authDispatch({
            type: AuthDispatchTypes.LOGOUT,
          });
        }
      }

      dispatch({ type: "error", payload: error as PostError });
    }
  };

  return { ...state, postData };
}

export default usePostRequest;
