interface AssignmentObject {
  id: string;
  type: string;
  name: string;
  description: string;
  additional_info: any;
  released_time: string;
  end_working_time: string;
}

interface QuizAttemptFetch {
  "answer-attempts": Array<TextQuestionAttempt | MultipleChoiceQuestionAttempt>;
  "assessment-tool-attempted": string;
  "tool-attempt-id": string;
}

interface QuestionAttempt {
  "question-attempt-id": string;
  "is-answered": boolean;
  prompt: string;
  "question-type": "multiple_choice" | "text";
}

interface TextQuestionAttempt extends QuestionAttempt {
  answer: string;
}

interface MultipleChoiceQuestionAttempt extends QuestionAttempt {
  "answer-options": {
    "answer-option-id": string;
    content: string;
  }[],
  "selected-answer-option-id": string;
}