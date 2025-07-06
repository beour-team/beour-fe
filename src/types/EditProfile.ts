export interface EditProfile {
  name?: string;
  nickName?: string;
  phone?: string;
  email?: string;
  emailDomain?: string;
  password?: string;
  confirmPassword?: string;
}

export interface UpdateProfileRequest {
  newNickname?: string;
  newPhone?: string;
}

export interface UpdatePasswordRequest {
  newPassword: string;
}
