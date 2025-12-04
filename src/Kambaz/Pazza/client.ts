// src/Kambaz/Pazza/client.ts
import axios from "axios";

const REMOTE = import.meta.env.VITE_REMOTE_SERVER || ""; // set in your env
const BASE = `${REMOTE}/api/pazza`;

const client = {
  // POSTS
  getPosts: async (courseId: string) => {
    const r = await axios.get(`${BASE}/${courseId}/posts`, { withCredentials: true });
    return r.data;
  },
  createPost: async (courseId: string, payload: any) => {
    const r = await axios.post(`${BASE}/${courseId}/posts`, payload, { withCredentials: true });
    return r.data;
  },
  getPost: async (postId: string) => {
    const r = await axios.get(`${BASE}/posts/${postId}`, { withCredentials: true });
    return r.data;
  },
  updatePost: async (postId: string, payload: any) => {
    const r = await axios.put(`${BASE}/posts/${postId}`, payload, { withCredentials: true });
    return r.data;
  },
  deletePost: async (postId: string) => {
    const r = await axios.delete(`${BASE}/posts/${postId}`, { withCredentials: true });
    return r.data;
  },

  // ANSWERS
  postAnswer: async (postId: string, text: string) => {
    const r = await axios.post(`${BASE}/posts/${postId}/answers`, { text }, { withCredentials: true });
    return r.data;
  },
  updateAnswer: async (postId: string, answerId: string, payload: any) => {
    const r = await axios.put(`${BASE}/posts/${postId}/answers/${answerId}`, payload, { withCredentials: true });
    return r.data;
  },
  deleteAnswer: async (postId: string, answerId: string) => {
    const r = await axios.delete(`${BASE}/posts/${postId}/answers/${answerId}`, { withCredentials: true });
    return r.data;
  },

  // FOLLOWUPS / REPLIES
  postFollowup: async (postId: string, text: string) => {
    const r = await axios.post(`${BASE}/posts/${postId}/followups`, { text }, { withCredentials: true });
    return r.data;
  },
  postReply: async (postId: string, fid: string, text: string) => {
    const r = await axios.post(`${BASE}/posts/${postId}/followups/${fid}/replies`, { text }, { withCredentials: true });
    return r.data;
  },

  // FOLDERS
  getFolders: async (courseId: string) => {
    const r = await axios.get(`${BASE}/${courseId}/folders`, { withCredentials: true });
    return r.data;
  },
  createFolder: async (courseId: string, name: string) => {
    const r = await axios.post(`${BASE}/${courseId}/folders`, { name }, { withCredentials: true });
    return r.data;
  },
  deleteFolder: async (id: string) => {
    const r = await axios.delete(`${BASE}/folders/${id}`, { withCredentials: true });
    return r.data;
  },

  // STATS
  getStats: async (courseId: string) => {
    try {
      const r = await axios.get(`${BASE}/${courseId}/stats`, { withCredentials: true });
      return r.data;
    } catch (e) {
      // If backend doesn't have stats endpoint yet, return fallback computed client-side
      console.warn("getStats failed; falling back", e);
      const posts: any = await client.getPosts(courseId);
      const total = posts.length;
      const unanswered = posts.filter((p: any) => !((p.answersInstructors || []).length || (p.answersStudents || []).length)).length;
      return { total, unanswered };
    }
  }
};

export default client;
