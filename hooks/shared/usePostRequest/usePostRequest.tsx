import { useAuthContext } from "@context/Authentication";
import { useEffect, useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  error?: PostError;
  status?: "loading" | "fetched" | "error" | "initial";
  postData?: () => void;
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
  postBody: T,
  options?: Options
): State<V> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${uri}`;
  const { user, accessToken, refreshToken, dispatch: authDispatch} = useAuthContext();

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<V> = {
    error: undefined,
    data: undefined,
    status: "initial"
  };

  // Keep state logic separated
  const fetchReducer = (state: State<V>, action: Action<V>): State<V> => {
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

  const postData = async () => {
    dispatch({ type: "loading" });

    // Directly post data if doesn't require token
    if (!options?.requiresToken) {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(postBody)
        });
        const json = await response.json();

        if (!response.ok) {
            const error: PostError = new Error(response.statusText);
            error.message = json.detail ?? json.message;
            error.status = response.status;
            dispatch({
                type: "error",
                payload: error as PostError
            });
            return;
        }

        dispatch({
            type: "fetched",
            payload: json
        });
        return;
    }


  };

  return { ...state, postData };
}

export default usePostRequest;
