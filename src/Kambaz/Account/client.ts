import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials,
    { withCredentials: true }
  );
  return response.data;
};

// ----------------------
// Signup with validation
// ----------------------
export const signup = async (user: any) => {
  // Client-side validation
  if (!user.username || user.username.trim() === "") {
    throw new Error("Username is required");
  }
  if (!user.firstName || user.firstName.trim() === "") {
    throw new Error("First name is required");
  }

  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

// ----------------------
// Update user with optional client validation
// ----------------------
export const updateUser = async (user: any) => {
  // Optional: prevent updating user to have empty username
  if (!user.username || user.username.trim() === "") {
    throw new Error("Username cannot be empty");
  }

  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

// ✅ FIXED: Create course should use /api/courses, not /api/users/current/courses
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API, {
    headers: { "Cache-Control": "no-cache" },
  });
  // Filter out users without a username or firstName
  const validUsers = response.data.filter(
    (user: any) => user.username && user.username.trim() !== "" && user.firstName && user.firstName.trim() !== ""
  );
  return validUsers;
};


export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`, {
    headers: { "Cache-Control": "no-cache" },
  });
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const { data } = await axios.post(USERS_API, user, { withCredentials: true });
  return data;
};
