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
  SPACE_NAME_REQUIRED,
  SPACE_CAPACITY_REQUIRED,
  SPACE_CAPACITY_MIN,
  PRICE_REQUIRED,
  PRICE_FORMAT,
  ADDRESS_REQUIRED,
  SPACE_DESCRIPTION_REQUIRED,
  SPACE_DESCRIPTION_LENGTH,
  SPACE_NOTICE_REQUIRED,
  SPACE_NOTICE_LENGTH,
  REFUND_POLICY_REQUIRED,
  REFUND_POLICY_LENGTH,
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

export const zodEditProfile = z.object({
  password: z.string(),
  confirmPassword: z.string(),
  name: z.string(),
  nickname: z.string(),
  email: z.string(),
  phone: z.string(),
  emailDomain: z.string(),
});

// 공간 등록 정보
export const zodHostSpaceInfo = z.object({
  spaceName: z.string({ message: SPACE_NAME_REQUIRED }).min(1, {
    message: SPACE_NAME_REQUIRED,
  }),
  price: z
    .number({ message: PRICE_REQUIRED })
    .min(1, { message: PRICE_REQUIRED })
    .refine((val) => val >= 0, { message: PRICE_FORMAT }),
  address: z.string({ message: ADDRESS_REQUIRED }).min(1, {
    message: ADDRESS_REQUIRED,
  }),
  spaceCapacity: z
    .number({ message: SPACE_CAPACITY_REQUIRED })
    .min(1, { message: SPACE_CAPACITY_MIN })
    .refine((val) => val >= 1, { message: SPACE_CAPACITY_MIN }),
  purpose: z
    .string({ message: SPACE_NAME_REQUIRED })
    .min(1, { message: SPACE_NAME_REQUIRED }),
  description: z
    .string({ message: SPACE_DESCRIPTION_REQUIRED })
    .min(1, { message: SPACE_DESCRIPTION_REQUIRED })
    .max(2000, { message: SPACE_DESCRIPTION_LENGTH }),
  notice: z
    .string({ message: SPACE_NOTICE_REQUIRED })
    .min(1, { message: SPACE_NOTICE_REQUIRED })
    .max(500, { message: SPACE_NOTICE_LENGTH }),
  refundPolicy: z
    .string({ message: REFUND_POLICY_REQUIRED })
    .min(1, { message: REFUND_POLICY_REQUIRED })
    .max(500, { message: REFUND_POLICY_LENGTH }), 
});

export type HostSpaceInfo = z.infer<typeof zodHostSpaceInfo>;