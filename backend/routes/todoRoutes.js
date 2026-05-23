import express from "express";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateStatus,
} from "../controllers/todoController.js";

const router = express.Router();

router.post("/", createTask);

router.get("/", getTasks);

router.get("/:id", getTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/status", updateStatus);

export default router;