// a hook for posting data to the server
// using XMLHttpRequest which allows for
// upload progress
import { useAuthContext } from "@context/Authentication";
import { AuthDispatchTypes } from "@context/Authentication/AuthDispatchTypes";
import { useReducer, useState } from "react";

interface UploadState {
  inProgress: boolean;
  failure: boolean;
  success: boolean;
}

type UseUploadHook<T, V> = [
  (body: T) => Promise<void>,
  UploadState,
  number,
  V | undefined,
  Error | undefined
];

interface UseUploadHookOptions<V> {
  onUploadStart?: () => Promise<void> | void;
  onUploadSuccess?: (response: V) => Promise<void> | void;
  onUploadError?: (error: Error) => Promise<void> | void;
}

const initialState: UploadState = {
  inProgress: false,
  success: false,
  failure: false,
};

const uploadStateReducer = (
  state: UploadState,
  action: { type: "success" | "failure" | "loading" }
): UploadState => {
  switch (action.type) {
    case "success":
      return {
        inProgress: false,
        failure: false,
        success: true,
      };
    case "failure":
      return {
        inProgress: false,
        failure: true,
        success: false,
      };
    case "loading":
      return {
        inProgress: true,
        failure: false,
        success: false,
      };
    default:
      return state;
  }
};

const verifyAccessToken = async (access: string, refresh: string | null) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get-info/`,
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );
  if (!response.ok) {
    if (response.status === 401) {
      if (!refresh) throw new Error("Authentication Error");
      const REQUEST_ACCESS_TOKEN_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/api/token/refresh/`;
      const requestNewAccessToken = await fetch(REQUEST_ACCESS_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refresh,
        }),
      });
      if (!requestNewAccessToken.ok) throw new Error("Authentication Error");

      const { access: newAccess, refresh: newRefresh } =
        await requestNewAccessToken.json();

      return { access: newAccess, refresh: newRefresh, fresh: true };
    } else {
      return null;
    }
  }
  return { access, refresh, fresh: false };
};

function useUpload<T = any, V = any>(
  targetUrl: string,
  options?: UseUploadHookOptions<V>
): UseUploadHook<T, V> {
  const [data, setData] = useState<V>();
  const [error, setError] = useState<Error>();
  const [uploadState, dispatch] = useReducer(uploadStateReducer, initialState);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    user,
    accessToken,
    refreshToken,
    dispatch: authDispatch,
  } = useAuthContext();

  const upload = async (body: T) => {
    let authResponse: {
      access: boolean;
      refresh: boolean;
      fresh: boolean;
    } | null;
    if (accessToken) {
      dispatch({ type: "loading" });
      try {
        authResponse = await verifyAccessToken(accessToken, refreshToken);
        if (!authResponse) {
          dispatch({ type: "failure" });
          options?.onUploadError &&
            options.onUploadError(
              new Error(
                "We couldn't authenticate your upload, please try again"
              )
            );
          return;
        }
        if (authResponse.fresh) {
          authDispatch({
            type: AuthDispatchTypes.LOGIN,
            payload: {
              accessToken: authResponse.access,
              refreshToken: authResponse.refresh,
              remember: !!authResponse.refresh,
              user,
            },
          });
        }
      } catch (e) {
        authDispatch({ type: AuthDispatchTypes.LOGOUT });
        return;
      }
      const data = new FormData();
      for (let key in body) {
        data.append(key, body[key] as any);
      }
      options?.onUploadStart && options.onUploadStart();
      setData(undefined);
      setError(undefined);
      setUploadProgress(0);
      const request = new XMLHttpRequest();
      request.responseType = "json";
      request.onreadystatechange = async function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status < 400) {
          setData(this.response as V);
          if (options?.onUploadSuccess) await options.onUploadSuccess(this.response as V);
          setUploadProgress(0);
          dispatch({ type: "success" });
        } else if (
          this.readyState === XMLHttpRequest.DONE &&
          this.status >= 400
        ) {
          const error = new Error();
          error.message = this.response.message;
          setError(error);
          options?.onUploadError && options.onUploadError(error);
          setUploadProgress(0);
          dispatch({ type: "failure" });
        }
      };
      request.upload.onprogress = function (event) {
        setUploadProgress(event.loaded / event.total);
      };
      request.open(
        "POST",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${targetUrl}`
      );
      request.setRequestHeader(
        "Authorization",
        `Bearer ${authResponse.access}`
      );
      request.send(data);
      return;
    }
    authDispatch({ type: AuthDispatchTypes.LOGOUT });
  };

  return [upload, uploadState, uploadProgress, data, error];
}

export default useUpload;
