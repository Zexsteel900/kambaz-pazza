import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const USERS_API = `${HTTP_SERVER}/api/users`;

// Enroll a user in a course
export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return data;
};

// Unenroll a user from a course
export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return data;
};

// Get all courses a user is enrolled in
export const findEnrolledCourses = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/courses`
  );
  return data;
};
