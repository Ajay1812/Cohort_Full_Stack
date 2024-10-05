import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import { Todo } from "../db";
import { todoInput, todoIdSchema } from '@ajay_o1/common';
const router = express.Router();

interface CreateTodoInput {
  title: string
  description : string
}

router.post('/todos', authenticateJwt, (req, res) => {
  let todoProps = todoInput.safeParse(req.body)
  if (!todoProps.success){
    res.send(411).json({
      message: "error while parsing"
    })
    return
  }
  const title = todoProps.data?.title
  const description = todoProps.data?.description
  const done = false;
  const userId = req.headers['userId'];

  const newTodo = new Todo({ title:title, description: description, done, userId });

  newTodo.save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req, res) => {
  const userId = req.headers['userId'];

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});



router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {

  const patchTodoProps = todoIdSchema.safeParse(req.params)
  if (!patchTodoProps.success){
    res.send(411).json({
      message: "error while parsing"
    })
    return
  }
  const todoId  = patchTodoProps.data.todoId;
  const userId = req.headers['userId'];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default router;
