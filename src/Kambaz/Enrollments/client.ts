import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.post(
    `${USERS_API}/${userId}/enrollments/${courseId}`
  );
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.delete(
    `${USERS_API}/${userId}/enrollments/${courseId}`
  );
  return data;
};

export const findEnrolledCourses = async (userId: string) => {
  const { data } = await axios.get(`${USERS_API}/${userId}/enrollments`);
  return data;
};
