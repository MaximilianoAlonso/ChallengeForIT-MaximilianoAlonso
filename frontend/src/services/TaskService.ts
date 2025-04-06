  import { Task } from "../types/task";

  const API_URL = "http://localhost:3000/api";

  export const getTasks = async (): Promise<Task[]> => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.tasks;
  };

  export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return res.json();
  };

  export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return res.json();
  };

  export const deleteTask = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  };