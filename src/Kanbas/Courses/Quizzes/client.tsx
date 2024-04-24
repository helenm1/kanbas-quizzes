import axios from "axios";
import { QuestionType, QuizType, AssignmentGroup } from "./constants";
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${API_BASE}/api/courses`;

// export interface Quiz {
//   _id?: string;
//   name: string;
//   description: string;
//   quizType: string;
//   availability: string;
//   published: boolean;
//   dueDate: string;
//   points?: number;
//   numQuestions: number;
//   course?: string;
// }

export type Question = {
  title: string;
  type: QuestionType;
  points: number;
  description: string;
  answers: string[];
  options: string[];
};

export type Quiz = {
  _id: string;
  isPublished: boolean;
  questions: Question[];
  title: string;
  description: string;
  type: QuizType;
  points: number;
  assignmentGroup: AssignmentGroup;
  shuffleAnswers: boolean;
  timeLimit?: number;
  multipleAttempts: boolean;
  showCorrectAnswers?: Date;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: Date;
  availableDate: Date;
  untilDate: Date;
};

const generateQuizzesApi = (courseId: string) =>
  `${COURSES_API}/${courseId}/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(generateQuizzesApi(courseId));
  return response.data;
};

export const fetchQuizById = async (courseId: string, quizId?: string) => {
  console.log("courseId in fetchquiz", courseId);
  console.log("quizId in fetchquiz", quizId);
  const response = await axios.get(`${generateQuizzesApi(courseId)}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(generateQuizzesApi(courseId), {
    ...quiz,
    course: courseId,
  });
  return response.data;
};

export const deleteQuiz = async (courseId: string, quiz: Quiz) => {
  const response = await axios.delete(
    `${generateQuizzesApi(courseId)}/${quiz._id}`
  );
  return response.data;
};

export const updateQuiz = async (courseId: string, quiz: Quiz) => {
  const response = await axios.put(
    `${generateQuizzesApi(courseId)}/${quiz._id}`,
    quiz
  );
  return response.data;
};
