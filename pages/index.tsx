import Dashboard from "@components/features/Dashboard";
import LoggedOutOnlyRoute from "@components/shared/layouts/LoggedOutOnlyRoute";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <LoggedOutOnlyRoute>
      <div></div>
    </LoggedOutOnlyRoute>
  );
};

export default Home;
