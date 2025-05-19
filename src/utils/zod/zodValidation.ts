import { z } from "zod";
import {
  EMAIL_REQUIRED,
  ID_REQUIRED,
  PASSWORD_REQUIRED,
} from "../../constants/validation.constants";

export const zodLogin = z.object({
  id: z.string({ message: EMAIL_REQUIRED }).min(1, { message: ID_REQUIRED }),
  password: z
    .string({ message: PASSWORD_REQUIRED })
    .min(1, { message: PASSWORD_REQUIRED }),
});
