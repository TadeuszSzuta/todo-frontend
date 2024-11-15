export interface Todo {
  id: number;
  name: string;
  isComplete: boolean;
}

const API_URL = "http://localhost:7203/todoitems";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Nie udało się pobrać listy zadań");
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
    throw new Error("Nie udało się dodać zadania");
  }
};

export const updateTodo = async (todo: Todo): Promise<void> => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Nie udało się zaktualizować zadania");
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error("Nie udało się usunąć zadania");
  }
};
