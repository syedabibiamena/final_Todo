import {
  createTodoService,
  getTodosService,
  getTodoByIdService,
  updateTodoService,
  deleteTodoService,
} from "../services/todoService.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueByDate } = req.body;

    if (!title || !description || !dueByDate) {
      return res.status(400).json({
        message: "Please provide all required task details.",
      });
    }

    const newTask = await createTodoService({
      title,
      description,
      dueByDate,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create the task.",
    });
  }
};

// Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const searchText = req.query.q || "";

    let filter = {};

    if (searchText) {
      filter.title = {
        $regex: searchText,
        $options: "i",
      };
    }

    const tasks = await getTodosService(filter);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch tasks.",
    });
  }
};

// Get Single Task
export const getTask = async (req, res) => {
  try {
    const task = await getTodoByIdService(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch task details.",
    });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { title, description, dueByDate } = req.body;

    if (!title || !description || !dueByDate) {
      return res.status(400).json({
        message: "All task fields are required.",
      });
    }

    const updatedTask = await updateTodoService(req.params.id, {
      title,
      description,
      dueByDate,
    });

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update the task.",
    });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await deleteTodoService(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete the task.",
    });
  }
};

// Update Task Status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await getTodoByIdService(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
      });
    }

    const updatedTask = await updateTodoService(req.params.id, {
      ...task._doc,
      status,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update task status.",
    });
  }
};
