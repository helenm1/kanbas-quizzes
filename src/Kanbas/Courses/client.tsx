import axios from "axios";
axios.defaults.withCredentials = true;
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const COURSES_API = `${BASE_API}/api/courses`;
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

export const deleteCourse = async (id: string) => {
  const response = await axios.delete(`${COURSES_API}/${id}`);
  return response.data;
};

// fetch a single course
// create a course
// update a course
// delete a course
