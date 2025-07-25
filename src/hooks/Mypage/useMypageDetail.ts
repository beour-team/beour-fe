import { useQuery } from "@tanstack/react-query";
import { MypageDetail } from "../../api/Mypage/MypageDetail";

interface MypageDetailResponse {
  name: string;
  email: string;
  nickName: string;
  phoneNum: string;
}

export const useMypageDetail = () => {
  return useQuery<MypageDetailResponse>({
    queryKey: ["mypageDetail"],
    queryFn: MypageDetail,
  });
};
