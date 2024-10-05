"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoIdSchema = exports.todoInput = exports.loginInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().min(1).max(40),
    password: zod_1.z.string().min(8).max(16)
});
exports.loginInput = zod_1.z.object({
    username: zod_1.z.string().min(1).max(40),
    password: zod_1.z.string().min(8).max(16)
});
exports.todoInput = zod_1.z.object({
    title: zod_1.z.string().min(1).max(60),
    description: zod_1.z.string().min(1).max(60)
});
exports.todoIdSchema = zod_1.z.object({
    todoId: zod_1.z.string().min(1, "Todo ID is required").regex(/^[a-fA-F0-9]{24}$/, "Invalid Todo ID"),
});
