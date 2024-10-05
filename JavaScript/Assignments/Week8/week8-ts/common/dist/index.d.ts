import { z } from 'zod';
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type SignupParams = z.infer<typeof signupInput>;
export declare const loginInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type LoginParams = z.infer<typeof loginInput>;
export declare const todoInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
}, {
    title: string;
    description: string;
}>;
export type TodoInput = z.infer<typeof todoInput>;
export declare const todoIdSchema: z.ZodObject<{
    todoId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    todoId: string;
}, {
    todoId: string;
}>;
export type TodoIdSchema = z.infer<typeof todoIdSchema>;
