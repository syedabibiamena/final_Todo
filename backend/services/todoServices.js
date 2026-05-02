import Todo from "../models/todoModel.js";

export const createTodoService = (data) => {
  return Todo.create(data);
};

export const getTodosService = () => {
  return Todo.find();
};