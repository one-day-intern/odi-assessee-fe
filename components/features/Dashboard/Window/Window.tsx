import React from "react";
import styles from "./Window.module.css";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";

interface Props {
  children?: React.ReactNode;
  onClose?: (app: Application) => void;
  app: Application;
}

const Window: React.FC<Props> = ({ app, onClose }) => {
  const Application = app.app;

  return (
      <div>Window</div>
  );
};

export default Window;
