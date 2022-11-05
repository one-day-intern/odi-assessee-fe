import { useDashboardAPI } from "@context/Dashboard/DashboardAPIContext";
import useResizeObserver from "@react-hook/resize-observer";
import React, { Suspense, useRef, useState } from "react";
import styles from "./EssayQuestion.module.css";

const ReactQuill = React.lazy(() => import("react-quill"));

const EssayQuestion = () => {
  const { window } = useDashboardAPI();
  const [sidebarSize, setSidebarSize] = useState<DOMRect>();
  const divRef = useRef<HTMLDivElement>(null);
  const sidebar = document.getElementById("quiz-sidebar");
  useResizeObserver(sidebar, (entry) => setSidebarSize(entry.contentRect));
  const maxQuilWidth = window.width - (sidebar ? sidebarSize?.width! + 82 : 82);

  return (
    <div ref={divRef} className={`${styles["question-body"]}`}>
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
      <div
        style={{ maxWidth: maxQuilWidth }}
        className={`${styles["question-answers"]}`}
      >
        <Suspense>
          <ReactQuill style={{ fontSize: "1rem" }} />
        </Suspense>
      </div>
    </div>
  );
};

export default EssayQuestion;
