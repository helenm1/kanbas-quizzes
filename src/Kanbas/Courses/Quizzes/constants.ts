export const PREVIEW_BANNER_MESSAGE =
  'This is a preview of the published version of the quiz';
export const UPDATED_AT_DATE_FORMAT = 'h:mmaaa';
export const DATE_FORMAT = "MMM dd 'at' h:mmaaa";

export enum QuestionType {
  MULTIPLE_CHOICE = 'Multiple Choice',
  TRUE_FALSE = 'True/False',
  FILL_IN_THE_BLANK = 'Fill in the Blank',
}

export enum QuizType {
  GRADED_QUIZ = 'Graded Quiz',
  PRACTICE_QUIZ = 'Practice Quiz',
  GRADED_SURVEY = 'Graded Survey',
  UNGRADED_SURVEY = 'Ungraded Survey',
}

export enum AssignmentGroup {
  QUIZZES = 'Quizzes',
  ASSIGNMENTS = 'Assignments',
  EXAMS = 'Exams',
  PROJECTS = 'Projects',
}
