import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/courses/:courseId/modules`;

export interface Module {
  _id?: string;
  name: string;
  description: string;
  course?: string;
  lessons?: any[];
}

export const findModulesForCourse = async (courseId: any) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModule = async (courseId: any, module: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/modules`, {
    ...module,
    course: courseId,
  });
  return response.data;
};

export const deleteModule = async (module: Module) => {
  const response = await axios.delete(`${MODULES_API}/${module._id}`);
  console.log(response.data);
  return response.data;
};

// export const deleteModule = async (module: Module) => {
//   const response = await axios.delete(`${MODULES_API}/${module._id}`);
//   return response.data;
// };

export const updateModule = async (module: Module) => {
  const response = await axios.put(`${MODULES_API}/${module._id}`, module);
  console.log(response.data);
  return response.data;
};
