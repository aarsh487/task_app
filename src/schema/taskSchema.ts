import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, "Title cannot be empty").max(20, "Keep it under 20"),
    isCompleted: z.boolean().optional().default(false)
})