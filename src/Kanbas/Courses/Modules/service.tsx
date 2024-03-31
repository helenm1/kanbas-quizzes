import axios from "axios";

const MODULES_API = "http://localhost:4000/api/modules";
export const deleteModule = async (moduleId: any) => {
  const response = await axios
    .delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};
export const updateModule = async (module: { _id: any; }) => {
    const response = await axios.
      put(`${MODULES_API}/${module._id}`, module);
    return response.data;
  };
  
