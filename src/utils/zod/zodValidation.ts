import { z } from "zod";
import {
  EMAIL_FORMAT,
  EMAIL_REQUIRED,
  ID_FORMAT,
  ID_REQUIRED,
  NAME_REQUIRED,
  NICKNAME_REQUIRED,
  PASSWORD_CONFIRM_INVALID,
  PASSWORD_CONFIRM_REQUIRED,
  PASSWORD_FORMAT,
  PASSWORD_REQUIRED,
  PHONE_FORMAT,
  PHONE_REQUIRED,
} from "../../constants/validation.constants";

export const zodLogin = z.object({
  id: z.string({ message: EMAIL_REQUIRED }).min(4, { message: ID_REQUIRED }),
  password: z
    .string({ message: PASSWORD_REQUIRED })
    .min(1, { message: PASSWORD_REQUIRED }),
});

export const zodSignUp = z
  .object({
    id: z.string({ message: ID_REQUIRED }).min(4, { message: ID_FORMAT }),

    password: z
      .string({ message: PASSWORD_REQUIRED })
      .min(8, { message: PASSWORD_FORMAT })
      .regex(/^[\s\S]{8,}$/, {
        message: PASSWORD_FORMAT,
      }),

    confirmPassword: z.string({ message: PASSWORD_CONFIRM_REQUIRED }),

    name: z
      .string({ message: NAME_REQUIRED })
      .min(1, { message: NAME_REQUIRED }),

    nickname: z
      .string({ message: NICKNAME_REQUIRED })
      .min(2, { message: NICKNAME_REQUIRED }),

    phone: z
      .string({ message: PHONE_REQUIRED })
      .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, {
        message: PHONE_FORMAT,
      }),

    email: z.string({ message: EMAIL_REQUIRED }),

    emailDomain: z
      .string({ message: EMAIL_REQUIRED })
      .min(1, { message: EMAIL_FORMAT }),
  })
  .refine(
    (data) => {
      const fullEmail = `${data.email}@${data.emailDomain}`;
      return z.string().email().safeParse(fullEmail).success;
    },
    {
      path: ["email"],
      message: "이메일 형식을 확인해주세요.",
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: PASSWORD_CONFIRM_INVALID,
  });
