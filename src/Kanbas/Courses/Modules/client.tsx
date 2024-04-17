import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_BASE_API_URL;
const COURSES_API = `${API_BASE}/api/courses`;
// const MODULES_API = `${API_BASE}/api/courses/:courseId/modules`;

export interface Module {
  _id?: string;
  name: string;
  description: string;
  course?: string;
  lessons?: any[];
}

const generateModulesApi = (courseId: string) =>
  `${COURSES_API}/${courseId}/modules`;

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(generateModulesApi(courseId));
  return response.data;
};

export const createModule = async (courseId: string, module: any) => {
  const response = await axios.post(generateModulesApi(courseId), {
    ...module,
    course: courseId,
  });
  return response.data;
};

export const deleteModule = async (courseId: string, module: Module) => {
  const response = await axios.delete(
    `${generateModulesApi(courseId)}/${module._id}`
  );
  return response.data;
};

export const updateModule = async (courseId: string, module: Module) => {
  const response = await axios.put(
    `${generateModulesApi(courseId)}/${module._id}`,
    module
  );
  return response.data;
};
