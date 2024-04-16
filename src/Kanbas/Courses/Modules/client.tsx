import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/courses/:courseId/modules`;

export const findModulesForCourse = async (courseId: any) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  console.log(response);
  return response.data;
};

export const createModule = async (courseId: any, module: any) => {
  console.log("module passed to create", module);
  const response = await axios.post(`${COURSES_API}/${courseId}/modules`, {
    ...module,
    course: courseId,
  });
  return response.data;
};

export const deleteModule = async (moduleId: any) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const updateModule = async (module: any) => {
  const response = await axios.put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};
