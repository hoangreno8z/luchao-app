import { z } from 'zod';

export const ThaiAtModeSchema = z.enum(['tue', 'nguyet', 'nhat', 'thoi', 'dich', 'menh']);

export const ThaiAtInputSchema = z.object({
  mode: ThaiAtModeSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày không đúng định dạng YYYY-MM-DD'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Giờ không đúng định dạng HH:MM'),
});

export type ThaiAtMode = z.infer<typeof ThaiAtModeSchema>;
export type ThaiAtInput = z.infer<typeof ThaiAtInputSchema>;
