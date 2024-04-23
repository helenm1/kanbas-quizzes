import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${API_BASE}/api/courses`;

export interface Question {
  _id?: string;
  questionText: string;
  points: number;
  questionType: string;
  tfAnswer: boolean;
  mcAnswers: [answer: string, correct: boolean];
  fillInAnswers: string[];
}

const generateQuizApi = (courseId: string, quizId: string) =>
  `${COURSES_API}/${courseId}/quizzes/${quizId}`;

// export const findAllQuestions = async (courseId: string, quizId: string) => {
//   const response = await axios.get(generateQuizApi(courseId, quizId));
//   return response.data;
// };

export const findQuestionsForQuiz = async (
  courseId: string,
  quizId: string
) => {
  const response = await axios.get(
    `${generateQuizApi(courseId, quizId)}/questions`
  );
  console.log("response in findQuestionsForQuiz", response.data);
  return response.data;
};

export const findQuestionById = async (
  courseId: string,
  quizId: string,
  questionId: string
) => {
  const response = await axios.get(
    `${generateQuizApi(courseId, quizId)}/questions/${questionId}`
  );
  return response.data;
};

export const createQuestion = async (
  courseId: string,
  quizId: string,
  question: any
) => {
  const response = await axios.post(
    `${generateQuizApi(courseId, quizId)}/questions`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (
  courseId: string,
  quizId: string,
  question: Question
) => {
  console.log("question in deleteQuestion", question);

  const response = await axios.delete(
    `${generateQuizApi(courseId, quizId)}/questions/${question._id}`
  );
  console.log("response in deleteQuestion", response.data);

  return response.data;
};

export const updateQuestion = async (
  courseId: string,
  quizId: string,
  questionId: string,
  question: Question
) => {
  const response = await axios.put(
    `${generateQuizApi(courseId, quizId)}/questions/${questionId}`,
    question
  );

  return response.data;
};
