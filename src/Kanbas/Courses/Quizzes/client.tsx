import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${API_BASE}/api/courses`;

export interface Quiz {
  _id?: string;
  name: string;
  description: string;
  availability: string;
  published: boolean;
  dueDate: string;
  points?: number;
  numQuestions: number;
  course?: string;
}

const generateQuizzesApi = (courseId: string) =>
  `${COURSES_API}/${courseId}/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(generateQuizzesApi(courseId));
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
