import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

// ✅ FIXED: Module routes need courseId
export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axiosWithCredentials.delete(
    `${REMOTE_SERVER}/api/courses/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/courses/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};