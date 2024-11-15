export interface Todo {
  id: number;
  name: string;
  isComplete: boolean;
}
const backend_PORT = 7203;

const API_URL = `http://localhost:${backend_PORT}/todoitems`;

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed at downloading todo list");
  }
  return response.json();
};

export const addTodo = async (todo: Partial<Todo>): Promise<void> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Failed to add a new task");
  }
};

export const updateTodo = async (todo: Todo) => {
  const response = await fetch(`/api/todos/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.ok;
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Failed to delete a task");
  }
};

export default backend_PORT;
