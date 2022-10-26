import React, { useEffect, useState } from "react";
import styles from "./QuestionMenu.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface QuestionTabProps extends React.PropsWithChildren {
  onClose: () => void;
}

const QuestionsTab: React.FC<QuestionTabProps> = ({ onClose }) => {
  const questions = Array.from(Array(100).keys());
  const isCurrent = 5

  return (
    <motion.div
      className={`${styles["question-menu"]}`}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ ease: "linear" }}
    >
      <h1 className={`${styles["question-menu_header"]}`}>All Questions</h1>
      <div className={`${styles["question-menu_list"]}`}>
        {questions.map((question, i) => (
          <motion.button
            animate={i === isCurrent ? { scale: [1.1, 0.8] } : {}}
            transition={{ repeat: Infinity, repeatType: "reverse" }}
            key={i}
            className={`${styles["question-menu_question"]}`}
          >
            {i}
          </motion.button>
        ))}
      </div>
      <button
        className={`${styles["question-menu_close"]}`}
        onClick={() => onClose()}
      >
        &times;
      </button>
    </motion.div>
  );
};

const QuestionMenu = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [inBrowser, setInBrowser] = useState(false);

  useEffect(() => {
    setInBrowser(true);
  }, []);

  return (
    <>
      <div className={`${styles["menu-button_container"]}`}>
        <motion.button
          onTap={() => setMenuOpened(!menuOpened)}
          whileTap={{ scale: 0.8 }}
          type="button"
          className={`${styles["menu-button"]}`}
        >
          <div className={`${styles["menu-button_tile"]}`} />
          <div className={`${styles["menu-button_tile"]}`} />
          <div className={`${styles["menu-button_tile"]}`} />
          <div className={`${styles["menu-button_tile"]}`} />
        </motion.button>
        <p className={`${styles["menu-button_caption"]}`}>View all questions</p>
      </div>

      {inBrowser &&
        createPortal(
          <AnimatePresence>
            {menuOpened && (
              <QuestionsTab onClose={() => setMenuOpened(false)} />
            )}
          </AnimatePresence>,
          document.getElementById("quiz-root")!
        )}
    </>
  );
};

export default QuestionMenu;
