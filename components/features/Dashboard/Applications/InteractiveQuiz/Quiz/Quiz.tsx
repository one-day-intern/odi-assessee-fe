import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AssignmentTimer from "../AssignmentTimer";
import styles from "./Quiz.module.css";
import { Button } from "@components/shared/elements/Button";
import EssayQuestion from "./EssayQuestion";
import { useDashboardAPI } from "@context/Dashboard/DashboardAPIContext";
import useGetRequest from "@hooks/shared/useGetRequest";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Loader } from "@components/shared/elements/Loader";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import { dateStringToSeconds } from "@utils/formatters/dateFormatter";
import usePostRequest from "@hooks/shared/usePostRequest";

const buttonStyles: React.CSSProperties = {
  maxWidth: 150,
  padding: "1rem",
  fontWeight: "bold",
  fontSize: "1rem",
  boxSizing: "border-box",
};

interface Props {
  quiz: AssignmentObject;
  setCurrentActiveQuiz: React.Dispatch<
    React.SetStateAction<AssignmentObject | null>
  >;
}

const WINDOW_BREAKPOINT = 840;

const Quiz: React.FC<Props> = ({ quiz, setCurrentActiveQuiz }) => {
  const router = useRouter();
  const durationInSeconds = dateStringToSeconds(quiz.end_working_time);
  const [isQuizEnd, setIsQuizEnd] = useState(durationInSeconds <= 0);
  const { window } = useDashboardAPI();
  const { fetchData } = useGetRequest<QuizAttemptFetch>(
    `/assessment/assessment-event/get-submitted-quiz/?assessment-event-id=${router.query["assessment-event-id"]}&assessment-tool-id=${quiz.id}`,
    { requiresToken: true, disableFetchOnMount: true }
  );
  const [questionAttempts, setQuestionAttempts] =
    useState<Array<TextQuestionAttempt | MultipleChoiceQuestionAttempt>>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { postData } = usePostRequest(
    `/assessment/assessment-event/submit-answers/`,
    { requiresToken: true }
  );
  const breakpoint = window.width <= WINDOW_BREAKPOINT;

  const updateMultipleChoiceQuestionAttempt = async (
    optionId: string,
    questionAttemptId: string
  ) => {
    if (questionAttempts && !isQuizEnd) {
      const prevQuestionState = questionAttempts.find(
        (question) => question["question-attempt-id"] === questionAttemptId
      );
      if (!prevQuestionState) {
        throw new Error("Question to update not found");
      }
      // we're gonna do an optimistic update
      setQuestionAttempts((prev) => {
        return prev?.map((question) => {
          if (question["question-attempt-id"] === questionAttemptId) {
            return {
              ...question,
              "selected-answer-option-id": optionId,
              "is-answered": true,
            } as MultipleChoiceQuestionAttempt;
          }
          return question;
        });
      });
      // now we actually post to the server
      const response = await postData({
        "assessment-event-id": router.query["assessment-event-id"],
        "assessment-tool-id": quiz.id,
        answers: [
          {
            "question-attempt-id": questionAttemptId,
            "answer-option-id": optionId,
          },
        ],
      });
      if (response instanceof Error) {
        toast.error(response.message);
        // if problem occured in saving answer
        // reset the question state back to the old one
        setQuestionAttempts((prev) => {
          return prev?.map((question) => {
            if (question["question-attempt-id"] === questionAttemptId) {
              return {
                ...prevQuestionState,
              } as MultipleChoiceQuestionAttempt;
            }
            return question;
          });
        });
      }
    }
  };

  const updateTextQuestionAttempt = async (
    answer: string,
    questionAttemptId: string
  ) => {
    if (questionAttempts && !isQuizEnd) {
      const prevQuestionState = questionAttempts.find(
        (question) => question["question-attempt-id"] === questionAttemptId
      );
      if (!prevQuestionState) {
        throw new Error("Question to update not found");
      }
      // we're gonna do an optimistic update
      setQuestionAttempts((prev) => {
        return prev?.map((question) => {
          if (question["question-attempt-id"] === questionAttemptId) {
            return {
              ...question,
              answer: answer.trim(),
              "is-answered": !!answer.trim(),
            } as TextQuestionAttempt;
          }
          return question;
        });
      });
      // now we actually post to the server
      const response = await postData({
        "assessment-event-id": router.query["assessment-event-id"],
        "assessment-tool-id": quiz.id,
        answers: [
          { "question-attempt-id": questionAttemptId, "text-answer": answer.trim() },
        ],
      });
      if (response instanceof Error) {
        toast.error(response.message);
        // if problem occured in saving answer
        // reset the question state back to the old one
        setQuestionAttempts((prev) => {
          return prev?.map((question) => {
            if (question["question-attempt-id"] === questionAttemptId) {
              return {
                ...prevQuestionState,
              } as MultipleChoiceQuestionAttempt;
            }
            return question;
          });
        });
      }
    }
  };

  const renderQuestion = () => {
    if (questionAttempts) {
      const current = questionAttempts[currentQuestion];
      if (current["question-type"] === "multiple_choice") {
        return (
          <MultipleChoiceQuestion
            key={current["question-attempt-id"]}
            onChange={updateMultipleChoiceQuestionAttempt}
            question={current as MultipleChoiceQuestionAttempt}
          />
        );
      } else if (current["question-type"] === "text") {
        return (
          <EssayQuestion
            key={current["question-attempt-id"]}
            onChange={updateTextQuestionAttempt}
            isQuizEnded={isQuizEnd}
            question={current as TextQuestionAttempt}
          />
        );
      }
    }
    return <React.Fragment key={"frag"} />;
  };

  const fetchQuizAttempt = async () => {
    const response = await fetchData();
    if (response instanceof Error) {
      toast.error(response.message);
      return;
    }
    const attempts = response["answer-attempts"];
    setQuestionAttempts(attempts);
  };

  useEffect(() => {
    fetchQuizAttempt();
    if (!isQuizEnd) {
      toast.info("Your answers will be automatically saved", {
        toastId: "quiz-info",
      });
    } else {
      toast.info("The quiz has ended", {
        toastId: "quiz-info",
      });
    }
    // eslint-disable-next-line
  }, []);

  if (!questionAttempts) {
    return (
      <div
        style={{
          color: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: window.height,
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <>
      {!breakpoint && (
        <Sidebar
          questions={questionAttempts}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      )}
      <div id="quiz-body" className={`${styles["quiz-body"]}`}>
        <button
          className={styles["back-button"]}
          onClick={() => setCurrentActiveQuiz(null)}
        >
          &larr; Back to Quizzes
        </button>
        <div className={`${styles["quiz-header"]}`}>
          <h1 className={`${styles["question-header"]}`}>
            Question {currentQuestion + 1}
          </h1>
          {!isQuizEnd && (
            <AssignmentTimer
              durationInSeconds={durationInSeconds}
              onTimerEnd={() => {
                toast.info(
                  "The quiz has ended! Feel free to review your answers!"
                );
                setIsQuizEnd(true);
              }}
            />
          )}
        </div>
        {renderQuestion()}
        <div className={`${styles["quiz-controls"]}`}>
          <Button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            style={{
              ...buttonStyles,
              backgroundColor: "transparent",
              color: currentQuestion === 0 ? "white" : "#3D65D8",
              border:
                currentQuestion === 0
                  ? "2px solid rgb(157, 157, 157)"
                  : "2px solid #3D65D8",
              padding: "0.75rem",
            }}
            variant="secondary"
          >
            Previous
          </Button>
          <Button
            disabled={currentQuestion + 1 === questionAttempts.length}
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            style={buttonStyles}
            variant="secondary"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
