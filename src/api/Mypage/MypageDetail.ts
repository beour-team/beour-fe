import {
  API_MYPAGE_DETAIL,
  API_UPDATE_PASSWORD,
  API_UPDATE_PROFILE,
} from "../../constants/endpoint/endpoint";
import { api } from "../api";
import axios from "axios";

// 내 정보 불러오기
export const MypageDetail = async () => {
  try {
    const response = await api.get(`${API_MYPAGE_DETAIL}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log("알수 없는 에러 :", error);
    }
    throw error;
  }
};

// 내 정보 수정하기 => 닉네임, 폰번호만
export const updateMypageDetail = async (updateData: {
  newNickname?: string;
  newPhone?: string;
}) => {
  try {
    const response = await api.patch(API_UPDATE_PROFILE, updateData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log("알수 없는 에러 :", error);
    }
    throw error;
  }
};

// 내 정보 수정하기 => 비밀번호만
export const updateMypagePassword = async (updateData: {
  newPassword?: string;
}) => {
  try {
    const response = await api.patch(API_UPDATE_PASSWORD, updateData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log("알수 없는 에러 :", error);
    }
    throw error;
  }
};
