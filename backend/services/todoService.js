import Todo from "../models/todoModel.js";

// Create Todo
export const createTodoService = async (taskData) => {
  return await Todo.create(taskData);
};

// Get All Todos
export const getTodosService = async (filter = {}) => {
  return await Todo.find(filter).sort({ createdAt: -1 });
};

// Get Todo By ID
export const getTodoByIdService = async (id) => {
  return await Todo.findById(id);
};

// Update Todo
export const updateTodoService = async (id, updatedData) => {
  return await Todo.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );
};

// Delete Todo
export const deleteTodoService = async (id) => {
  return await Todo.findByIdAndDelete(id);
};