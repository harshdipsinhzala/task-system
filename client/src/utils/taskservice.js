import axios from "axios";
import { apiUrl } from "./api.js";

const API_URL = apiUrl("/tasks");
const TASK_CACHE_TTL = 60 * 1000;

let taskCache = {
  data: null,
  timestamp: 0,
  token: null,
};

export const getCachedTasks = () => {
  const token = localStorage.getItem("token");
  const isFresh = Date.now() - taskCache.timestamp < TASK_CACHE_TTL;

  if (taskCache.data && taskCache.token === token && isFresh) {
    return taskCache.data;
  }

  return null;
};

export const invalidateTasksCache = () => {
  taskCache = {
    data: null,
    timestamp: 0,
    token: null,
  };
};

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in again.");
  return token;
};

export const createTask = async (taskData) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/create`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  invalidateTasksCache();
  return response.data;
};

export const updateTask = async (taskId, updatedData) => {
  const token = getToken();
  const response = await axios.put(`${API_URL}/${taskId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  invalidateTasksCache();
  return response.data;
};

export const getTasks = async ({ force = false } = {}) => {
  const token = getToken();
  const cachedTasks = getCachedTasks();

  if (!force && cachedTasks) {
    return cachedTasks;
  }

  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  taskCache = {
    data: response.data,
    timestamp: Date.now(),
    token,
  };
  return response.data;
};

export const getTrashedTasks = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/trash`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.tasks;
};

// ✅ Restore single task
export const restoreTask = async (taskId) => {
  const token = getToken();
  const response = await axios.put(
    `${API_URL}/restore/${taskId}?actionType=restore`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  invalidateTasksCache();
  return response.data;
};

// ✅ Permanently delete a task
export const permanentDeleteTask = async (taskId) => {
  const token = getToken();
  const response = await axios.delete(
    `${API_URL}/delete/${taskId}?actionType=delete`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  invalidateTasksCache();
  return response.data;
};

// ✅ Restore all tasks — changed from PUT to DELETE
export const restoreAllTasks = async () => {
  const token = getToken();
  try {
    const response = await axios.put(`${API_URL}/restore-all`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    invalidateTasksCache();
    return response.data;
  } catch (error) {
    console.error("Error restoring all tasks:", error);
    throw error;
  }
};

// ✅ Permanently delete all tasks
export const permanentDeleteAllTasks = async () => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/delete-all?actionType=deleteAll`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  invalidateTasksCache();
  return response.data;
};
