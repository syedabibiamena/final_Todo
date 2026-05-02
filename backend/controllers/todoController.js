import Todo from "../models/todoModel.js";

export const creating_a_Task = async (req, res, next) => {
  try {
    const { title, description, dueByDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is must" });
    }

    const task = await Todo.create({ title, description, dueByDate });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
  
};


export const geting_a_Tasks = async (req, res, next) => {
  try {
    const { q } = req.query;

    let query = {};

    if (q) {
      query.title = { $regex: q, $options: "i" };
    }

    const tasks = await Todo.find(query);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const get_a_Single_Task = async (req, res, next) => {
  try {
    const task = await Todo.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not  is found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};


export const update_a_Task = async (req, res, next) => {
  try {
    const task = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task is  not  found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const delete_a_Task = async (req, res, next) => {
  try {
    const task = await Todo.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updating_Status = async (req, res, next) => {
  try {
    const { status } = req.body;

    const task = await Todo.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    next(error);
  }
};