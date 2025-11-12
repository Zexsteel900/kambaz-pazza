import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const COURSE_USERS_API = `${REMOTE_SERVER}/api/courses`;

export const findUsersInCourse = async (cid: string) => {
  const response = await axios.get(`${COURSE_USERS_API}/${cid}/users`);
  return response.data;
};

export const deleteUser = async (uid: string) => {
  const response = await axios.delete(`${USERS_API}/${uid}`);
  return response.data;
};
