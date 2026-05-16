import express from "express";
import {
  creating_a_Task,
  geting_a_Tasks,
  get_a_Single_Task,
  update_a_Task,
  delete_a_Task,
  updating_Status,
} from "../controllers/todoController.js";

const router = express.Router();

router.post("/", creating_a_Task);
router.get("/", geting_a_Tasks);
router.get("/:id", get_a_Single_Task);
router.put("/:id", update_a_Task);
router.delete("/:id", delete_a_Task);
router.patch("/:id/status", updating_Status);
router.get("/", (req, res) => {
  res.send("Todo API Working");
});
export default router;

