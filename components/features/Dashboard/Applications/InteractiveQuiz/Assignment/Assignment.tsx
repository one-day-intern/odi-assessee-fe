import React from "react";
import AssignmentTimer from "../AssignmentTimer";
import styles from "./Assignment.module.css";
import FileDropzone from "./FileDropzone";

const Assignment = () => {
  return (
    <main className={styles["assignment-body"]}>
      <section className={styles["assignment-container"]}>
        <div className={styles["assignment-head"]}>
          <h1 className={styles["assignment-title"]}>My Assignment</h1>
          <AssignmentTimer durationInMinutes={60} />
        </div>
        <p className={styles["assignment-task"]}> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequuntur iste veritatis est. Accusamus iste molestiae optio architecto? Repellendus in quod nam eveniet! Doloribus facere commodi sequi voluptatem, veniam voluptas!
            Harum neque suscipit nihil repellat minima numquam fugiat hic, alias necessitatibus, sapiente enim deserunt ducimus iste. Ipsum quod eos temporibus! Accusantium qui, amet cum adipisci aliquid perspiciatis aperiam harum dicta?
            Repellendus voluptates molestias laboriosam consequatur voluptatibus dolor, aut magni quibusdam error mollitia at distinctio necessitatibus. Perferendis corrupti quas dolores inventore sunt expedita illo sint! Itaque quibusdam nemo aliquid rerum accusamus.
            Saepe ipsa ipsam sequi nulla veniam minima ut voluptates, quisquam qui aut placeat eum vero optio autem quibusdam nihil vel doloribus ea adipisci, modi tenetur unde pariatur. Fugiat, suscipit eius?
            Numquam vitae corrupti nemo voluptatum earum error quia natus iste ipsa blanditiis ex inventore, aliquid quas explicabo, et officia eveniet enim quis, amet unde sequi facilis. Culpa magni architecto optio.
        </p>
        <div className={styles["assignment-dropzone_container"]}>
          <FileDropzone />
        </div>
      </section>
    </main>
  );
};

export default Assignment;
