import { z } from 'zod';

export const KinhDichInputSchema = z.object({
  dateTime: z.string().min(1, 'Ngày giờ không được để rỗng'),
  lines: z.array(z.number().min(0).max(3)).length(6, 'Quẻ dịch phải bao gồm đúng 6 hào'),
});

export type KinhDichInput = z.infer<typeof KinhDichInputSchema>;
