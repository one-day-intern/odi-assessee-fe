import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@context/Authentication";
import { MotionConfig } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastContainer containerId="root-toast"/>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </MotionConfig>
  );
}

export default MyApp;
