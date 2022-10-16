import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@context/Authentication";
import { MotionConfig } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </MotionConfig>
  );
}

export default MyApp;
