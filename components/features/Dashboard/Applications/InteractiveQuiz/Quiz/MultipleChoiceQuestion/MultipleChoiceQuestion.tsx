import React, { useState } from "react";
import styles from "./MultipleChoiceQuestion.module.css";
import { motion } from "framer-motion";

interface MultipleChoiceProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  value?: string;
}

const MultipleChoice: React.FC<
  React.PropsWithChildren<MultipleChoiceProps>
> = ({ value, selected, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.99 }}
      animate={{ scale: selected ? 1.015 : 1 }}
      className={`${styles["choice"]} ${selected ? styles.selected : ""}`}
    >
      <div className={`${styles["indicator-outer"]}`}>
        <div className={`${styles["indicator-inner"]}`} />
      </div>
      <p>{value}</p>
    </motion.button>
  );
};

const MultipleChoiceQuestion = () => {
  const answers = ["Hello", "World", "Hi", "Mom"];
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(
    undefined
  );

  return (
    <div className={`${styles["question-body"]}`}>
      <p className={`${styles["question"]}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
        modi quia! Reprehenderit atque in excepturi, optio ipsum maiores ratione
        ipsa numquam deserunt eum quia ducimus aut sunt rem consectetur
        mollitia. Cupiditate repellendus reprehenderit, est mollitia sed illo
        inventore corporis? Nihil, saepe. Nam corrupti quis consectetur suscipit
        tempore? Repellat ipsa sunt, adipisci harum vel sed totam ratione. Sunt
        et asperiores corporis? Ex, magnam molestias aspernatur, quaerat
        possimus quia voluptate nesciunt delectus a, ipsum assumenda
        reprehenderit? Dignissimos hic esse itaque? Exercitationem fugiat
        accusamus aliquid voluptas nam cupiditate dignissimos natus ad delectus
        excepturi? Expedita optio sed excepturi quis dignissimos animi,
        obcaecati ducimus dolorum dolore! Veritatis aliquam accusamus
        reprehenderit eveniet pariatur velit nulla aspernatur dolores, quisquam
        perferendis quas sit fugiat corrupti, nesciunt rerum temporibus? Non
        iste sequi dicta, quaerat optio quas reprehenderit fugit. Asperiores
        magni a tempore, quisquam modi unde commodi ad assumenda nulla ipsa
        aspernatur eligendi itaque, atque dicta. Autem illo consequuntur totam?
      </p>
      <div className={`${styles["question-answers"]}`}>
        {answers.map((answer, i) => (
          <MultipleChoice
            key={answer}
            value={answer}
            onClick={() => setSelectedAnswer(i)}
            selected={i === selectedAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
