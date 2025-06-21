import { useQuery } from "@tanstack/react-query";
import { Mypage } from "../../api/Mypage/Mypage";

interface MypageResponse {
  userName: string;
  userEmail: string;
}

export const useMypage = () => {
  return useQuery<MypageResponse | null, Error>({
    queryKey: ["mypage"],
    queryFn: Mypage,
  });
};
