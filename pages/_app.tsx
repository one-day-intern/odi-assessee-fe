import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@context/Authentication";
import { MotionConfig } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>One Day Intern</title>
        <link rel="icon" href="/app/odi.svg" />
        <meta
          name="description"
          content="Your one stop solution for all your assessment needs."
        />
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MotionConfig reducedMotion="user">
        <ToastContainer containerId="root-toast" />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MotionConfig>
    </>
  );
}

export default MyApp;
