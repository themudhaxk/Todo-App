import Todo from "../models/todoModel.js";
import asyncHandler from "express-async-handler";

const createTodo = asyncHandler(async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.json({ error: "Name is required" });
    }
    const existingTodo = await Todo.findOne({ title });
    if (existingTodo) {
      return res.json({ error: "Todo already exists" });
    }
    if (req.body.title && title.lenght > 15) {
      return res.json({ error: "Title cannot be more than 15 characters" });
    }

    if (req.body.text && text.lenght > 50) {
      return res.json({ error: "Text cannot be more than 50 characters" });
    }
    if (req.body.text && text.lenght < 10) {
      return res.json({ error: "Text must be more than 10 characters" });
    }

    const newTodo = await new Todo({ title, text }).save();
    res.json(newTodo);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  try {
    const { title, text } = req.body;
    const { todoId } = req.params;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Check the length of the title
    if (req.body.title && title.length > 15) {
      // return res.json({ error: "Title cannot be more than 15 characters" });
      throw new Error("Title cannot be more than 15 characters")
    }

    // Check the length of the text
    if (req.body.text && text.length > 50) {
      return res.json({ error: "Text cannot be more than 50 characters" });
    }

    if (req.body.text && text.length < 10) {
      return res.json({ error: "Text must be more than 10 characters" });
    }

    todo.title = title ?? todo.title;
    todo.text = text ?? todo.text;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.todoId);
    res.json(deletedTodo);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Todo not found" });
  }
});

const getAllTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Todo not found" });
  }
});

const getTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Todo not found" });
  }
});

const markAsCompleted = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      todo.completed = true;

      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404);
      throw new Error("Todo not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAsNotCompleted = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      todo.completed = false;

      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404);
      throw new Error("Todo not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  markAsCompleted,
  markAsNotCompleted,
};
