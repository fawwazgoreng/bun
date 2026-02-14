import * as z from 'zod';

export const Validator = <T>(validate: z.ZodType<T>, req: Object) => {
  try {
    const res = validate.parse(req);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
  }
}
