import express from "express";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  markAsCompleted,
  markAsNotCompleted,
} from "../controllers/todoController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, createTodo);

router.route("/:todoId").put(authenticate, updateTodo);

router.route("/:todoId").delete(authenticate, deleteTodo);

router.route("/todos").get(getAllTodos);

router.route("/:id").get(getTodo);

router.route("/:id/completed").put(authenticate, markAsCompleted);

router.route("/:id/not-completed").put(authenticate, markAsNotCompleted);

export default router;
