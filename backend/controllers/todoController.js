import {
  createTodoService,
  getTodosService,
  getTodoByIdService,
  updateTodoService,
  deleteTodoService,
} from "../services/todoService.js";

// Create new task
export const createTask = async (req, res) => {
  const { title, description, dueByDate } = req.body;

  if (!title || !description || !dueByDate) {
    return res.status(400).json({
      message: "Please fill all task details",
    });
  }

  try {
    const task = await createTodoService({
      title,
      description,
      dueByDate,
    });

    res.status(201).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error while creating task",
    });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  const search = req.query.q || "";

  let filterData = {};

  if (search) {
    filterData.title = {
      $regex: search,
      $options: "i",
    };
  }

  try {
    const tasks = await getTodosService(filterData);

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cannot fetch tasks",
    });
  }
};

// Get single task
export const getTask = async (req, res) => {
  try {
    const task = await getTodoByIdService(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task does not exist",
      });
    }

    res.json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching task",
    });
  }
};

// Update task
export const updateTask = async (req, res) => {
  const { title, description, dueByDate } = req.body;

  if (!title || !description || !dueByDate) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const updatedTask = await updateTodoService(
      req.params.id,
      {
        title,
        description,
        dueByDate,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(updatedTask);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating task",
    });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await deleteTodoService(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting task",
    });
  }
};

// Update task status
export const updateStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const task = await getTodoByIdService(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = status;

    const updatedTask = await updateTodoService(
      req.params.id,
      task
    );

    res.json(updatedTask);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Could not update task status",
    });
  }
};