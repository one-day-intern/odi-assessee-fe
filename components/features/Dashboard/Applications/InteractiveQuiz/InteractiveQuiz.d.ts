export enum QuestionType {
  ESSAY = "text",
  MULTIPLE_CHOICE = "multiple_choice",
}

interface MultipleChoiceQuestionOption {
  content: string;
}

interface QuestionAttempt {
  prompt: string;
  points?: number;
  question_type: QuestionType;
}

interface MultipleChoiceQuestionAttempt extends QuestionAttempt {
  // optionId: string ? POST answer => query option by id => check if correct
  options: MultipleChoiceQuestionOption[];
  answer: MultipleChoiceQuestionOption | null;
}

