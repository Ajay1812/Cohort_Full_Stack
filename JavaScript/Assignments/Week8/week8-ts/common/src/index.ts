import { z } from 'zod'

export const signupInput = z.object({
  username: z.string().min(1).max(40),
  password: z.string().min(8).max(16) 
});

export type SignupParams = z.infer<typeof signupInput>

export const loginInput = z.object({
  username: z.string().min(1).max(40),
  password: z.string().min(8).max(16) 
});

export type LoginParams = z.infer<typeof loginInput>

export const todoInput = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(60)
})

export type TodoInput = z.infer<typeof todoInput>

export const todoIdSchema = z.object({
  todoId: z.string().min(1, "Todo ID is required").regex(/^[a-fA-F0-9]{24}$/, "Invalid Todo ID"),
});

export type TodoIdSchema = z.infer<typeof todoIdSchema>
