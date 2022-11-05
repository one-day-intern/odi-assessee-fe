import React from "react";
import useUpload from "./useUpload";
import { renderHook } from "@testing-library/react";
import { AuthProvider } from "../../../context/Authentication/AuthContext";

interface MockResponse {
  message: string;
}

const AuthWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

describe("useUpload hook test suite", () => {
  beforeEach(() => {
    localStorage.setItem("accessToken", "accesstoken");
    localStorage.setItem("refreshToken", "refreshtoken");
  });
    test("test render hook", () => {
      localStorage.clear();
      const { result } = renderHook(
        () => useUpload<any, MockResponse>("/mock/upload/"),
        { wrapper: AuthProvider }
      );
      let [upload, uploadState, uploadProgress, data, error] = result.current;

      upload({});

      expect(typeof upload).toBe("function");
      expect(typeof uploadState).toBe("object");
      expect(typeof uploadProgress).toBe("number");
      expect(typeof data).toBe("undefined");
      expect(typeof error).toBe("undefined");
    });
    test("test upload file success", async () => {
      const { result } = renderHook(
        () =>
          useUpload<any, MockResponse>("/mock/upload/", {
            onUploadStart: () => {},
            onUploadSuccess: () => {},
          }),
        { wrapper: AuthWrapper }
      );
      const requestBody = { hello: "world" };
      await new Promise((resolve) => setTimeout(resolve, 500));

      const [upload] = result.current;
      await upload(requestBody);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = result.current[3];

      expect(data).toBeTruthy();
      expect(data?.message).toBe("file received!");
    });
    test("test upload file error", async () => {
      const { result } = renderHook(
        () =>
          useUpload<any, MockResponse>("/mock/upload/error/", {
            onUploadError: () => {},
          }),
        { wrapper: AuthWrapper }
      );
      const requestBody = { hello: "world" };
      await new Promise((resolve) => setTimeout(resolve, 500));

      const [upload] = result.current;
      await upload(requestBody);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const error = result.current[4];

      expect(error).toBeTruthy();
      expect(error?.message).toBe("file upload error");
    });
  test("test upload file with expired token", async () => {
    localStorage.setItem("accessToken", "expired");
    localStorage.setItem("refreshToken", "refreshtoken");
    const { result } = renderHook(
      () =>
        useUpload<any, MockResponse>("/mock/upload/", {
          onUploadStart: () => {},
          onUploadSuccess: () => {},
        }),
      { wrapper: AuthWrapper }
    );
    const requestBody = { hello: "world" };
    await new Promise((resolve) => setTimeout(resolve, 500));

    const [upload] = result.current;
    await upload(requestBody);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data = result.current[3];

    expect(data).toBeTruthy();
    expect(data?.message).toBe("file received!");
  });
});
