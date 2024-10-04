"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middleware/index");
const db_1 = require("../db");
const zod_1 = require("zod");
const router = express_1.default.Router();
const titleInput = zod_1.z.object({
    title: zod_1.z.string().min(1).max(60),
    description: zod_1.z.string().min(1).max(60)
});
router.post('/todos', index_1.authenticateJwt, (req, res) => {
    const parsedInput = titleInput.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({ error: parsedInput.error });
        return;
    }
    // const input: CreateTodoInput = req.body;
    const done = false;
    const userId = req.headers['userId'];
    const newTodo = new db_1.Todo({ title: parsedInput.data.title, description: parsedInput.data.description, done, userId });
    newTodo.save()
        .then((savedTodo) => {
        res.status(201).json(savedTodo);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
router.get('/todos', index_1.authenticateJwt, (req, res) => {
    const userId = req.headers['userId'];
    db_1.Todo.find({ userId })
        .then((todos) => {
        res.json(todos);
    })
        .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.patch('/todos/:todoId/done', index_1.authenticateJwt, (req, res) => {
    const { todoId } = req.params;
    const userId = req.headers['userId'];
    db_1.Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
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
exports.default = router;
