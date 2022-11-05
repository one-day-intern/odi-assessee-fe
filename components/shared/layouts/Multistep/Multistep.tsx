import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Backdrop } from "../Backdrop";
import styles from "./Multistep.module.css";
import { MultistepChoice } from "./MultistepChoice";

const wrapperVariants = {
  beforeShown: {
    x: -20,
    opacity: 0,
    transition: {
      type: "tween"
    }
  },
  shown: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween"
    }
  },
  afterShown: {
    x: 20,
    opacity: 0,
    transition: {
      type: "tween"
    }
  },
};

const Multistep = ({ elements, selectedId, selectStep }: MultistepProps) => {
  const handleChangeStep = (id: number) => () => selectStep(id);
  const currentElement = elements.filter(
    (element) => element.id === selectedId
  )[0];


  return (
    <Backdrop>
      <div className={styles["window__container"]}>
        <nav className={styles["window__navbar"]}>
          {elements.map((element) => (
            <MultistepChoice
              key={element.id}
              {...element}
              onClick={handleChangeStep(element.id)}
            />
          ))}
        </nav>
      </div>
      <div className={styles["window__main"]}>
        <AnimatePresence mode="wait">
          <motion.div key={currentElement.id}
          variants={ wrapperVariants }
          initial="beforeShown"
          animate="shown"
          exit="afterShown"
          className={ styles["window__main--container"]}>
            {currentElement.reactElement}
          </motion.div>
        </AnimatePresence>
      </div>
    </Backdrop>
  );
};

export { Multistep };
