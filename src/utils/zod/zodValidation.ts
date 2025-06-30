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

// 🔐 로그인 스키마
export const zodLogin = z.object({
  id: z
    .string({ message: EMAIL_REQUIRED })
    .min(5, { message: ID_REQUIRED })
    .max(15, { message: ID_FORMAT })
    .regex(/^[a-zA-Z0-9]{5,15}$/, { message: ID_FORMAT }),

  password: z
    .string({ message: PASSWORD_REQUIRED })
    .min(4, { message: PASSWORD_FORMAT })
    .max(20, { message: PASSWORD_FORMAT })
    .regex(/^[\w\W]{4,20}$/, { message: PASSWORD_FORMAT }),
});

// 📝 회원가입 스키마
export const zodSignUp = z
  .object({
    loginId: z
      .string({ message: ID_REQUIRED })
      .regex(/^[a-zA-Z0-9]{5,15}$/, { message: ID_FORMAT }),

    password: z
      .string({ message: PASSWORD_REQUIRED })
      .regex(/^[\w\W]{4,20}$/, { message: PASSWORD_FORMAT }),

    confirmPassword: z.string({ message: PASSWORD_CONFIRM_REQUIRED }),

    name: z
      .string({ message: NAME_REQUIRED })
      .min(1, { message: NAME_REQUIRED }),

    nickname: z
      .string({ message: NICKNAME_REQUIRED })
      .min(1, { message: NICKNAME_REQUIRED })
      .max(8, { message: NICKNAME_REQUIRED }),

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

export const zodEditProfile = z
  .object({
    name: z.string().optional(),
    nickName: z
      .string()
      .min(1, { message: NICKNAME_REQUIRED })
      .max(8, { message: NICKNAME_REQUIRED })
      .optional()
      .or(z.literal("")),
    phone: z.string().optional(),
    email: z.string().optional(),
    emailDomain: z.string().optional(),
    password: z
      .string()
      .min(4, { message: PASSWORD_FORMAT })
      .max(20, { message: PASSWORD_FORMAT })
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // 닉네임이 입력되었다면 유효성 검사
      if (data.nickName && data.nickName.trim() !== "") {
        return data.nickName.length >= 1 && data.nickName.length <= 8;
      }
      return true;
    },
    {
      path: ["nickName"],
      message: "닉네임은 1-8자 사이여야 합니다.",
    }
  )
  .refine(
    (data) => {
      // 폰번호가 입력되었다면 유효성 검사
      if (data.phone && data.phone.trim() !== "") {
        return /^01[016789]-?\d{3,4}-?\d{4}$/.test(data.phone);
      }
      return true;
    },
    {
      path: ["phone"],
      message: "올바른 전화번호를 입력하세요.",
    }
  )
  .refine(
    (data) => {
      // 비밀번호가 입력되었다면 유효성 검사
      if (data.password && data.password.trim() !== "") {
        return data.password.length >= 4 && data.password.length <= 20;
      }
      return true;
    },
    {
      path: ["password"],
      message: "비밀번호는 4-20자 사이여야 합니다.",
    }
  )
  .refine(
    (data) => {
      // 비밀번호가 입력되었다면 확인 비밀번호 검사
      if (data.password && data.password.trim() !== "") {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      path: ["confirmPassword"],
      message: "비밀번호가 일치하지 않습니다",
    }
  );
