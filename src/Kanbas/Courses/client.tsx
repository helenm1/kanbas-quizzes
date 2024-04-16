import axios from "axios";
axios.defaults.withCredentials = true;
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const COURSES_API = `${BASE_API}/api/courses`;

export interface Course {
  _id?: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: string;
  description: string;
}
// CRUD
// fetch all the courses
export const fetchCourses = async () => {
  const response = await axios.get(`${COURSES_API}`);
  return response.data;
};

export const fetchCourseById = async (id?: string) => {
  const response = await axios.get(`${COURSES_API}/${id}`);
  return response.data;
};

export const fetchModulesForCourse = async (id?: string) => {
  const response = await axios.get(`${COURSES_API}/${id}/modules`);
  return response.data;
};

export const createCourse = async (course: any) => {
  const response = await axios.post(`${COURSES_API}`, course);
  return response.data;
};

export const deleteCourse = async (course: Course) => {
  const response = await axios.delete(`${COURSES_API}/${course._id}`);
  return response.data;
};

export const updateCourse = async (course: Course) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};

// fetch a single course
// create a course
// update a course
// delete a course
