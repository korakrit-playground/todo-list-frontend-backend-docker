const db = require("../models");

const getTodoList = async (req, res) => {
  const todoList = await db.TodoList.findAll({
    where: { user_id: req.user.id },
  });
  res.status(200).send(todoList);
};

const addTodoList = async (req, res) => {
  try {
    const newTodo = await db.TodoList.create({
      task: req.body.task,
      user_id: req.user.id,
    });
  
    res.status(201).send(newTodo);
  } catch (error) {
    console.error(`Error Message: ${error.message}`)
    res.status(500);
  }
  
};

const deleteTodoList = async (req, res) => {
  const targetId = Number(req.params.id);
  const targetTodo = await db.TodoList.findOne({
    where: { id: targetId, user_id: req.user.id },
  });
  if (targetTodo) {
    await db.TodoList.destroy({
      where: { id: targetId },
    });
  } else {
    res.status(404).send({ message: "Todo list not found" });
  }

  res.status(204).send();
};

const updateTodoList = async (req, res) => {
  const targetId = Number(req.params.id);
  const newTask = req.body.task;
  const targetTodo = await db.TodoList.findOne({
    where: { id: targetId, user_id: req.user.id },
  });
  if (targetTodo) {
    await db.TodoList.update(
      {
        task: newTask,
      },
      {
        where: { id: targetId },
      }
    );
  } else {
    res.status(404).send({ message: "Todo list not found" });
  }

  res.status(200).send({ message: "Updating is success" });
};

module.exports = {
  getTodoList,
  addTodoList,
  deleteTodoList,
  updateTodoList,
};
