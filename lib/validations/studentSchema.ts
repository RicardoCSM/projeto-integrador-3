import * as z from 'zod';

export const studentSchema = z.object({
  id: z.string().min(1, 'O número de matrícula é obrigatório'),
  name: z.string().min(1, 'O nome é obrigatório'),
});

export type StudentSchema = z.infer<typeof studentSchema>;
