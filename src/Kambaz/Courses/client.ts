import axios from "axios";

// ----------------------
// CONFIG
// ----------------------
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const USERS_API = `${REMOTE_SERVER}/api/users`;

const axiosWithCredentials = axios.create({ withCredentials: true });

// ----------------------
// COURSES
// ----------------------
export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}`);
  return data;
};

export const createCourse = async (course: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}`, course);
  return response.data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
  return data;
};

// ----------------------
// MODULES
// ----------------------
export const createModuleForCourse = async (courseId: string, moduleData: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, moduleData);
  return data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};

// ----------------------
// ENROLLMENTS
// ----------------------
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return data;
};

export const fetchUserCourses = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
  return data;
};

// ----------------------
// USERS ENROLLED IN A COURSE
// ----------------------
export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return data;
};
