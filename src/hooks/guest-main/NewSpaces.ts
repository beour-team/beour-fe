//게스트 메인화면 - 내 주변 새 공간
import { useQuery } from "@tanstack/react-query";
import { fetchNewSpaces } from "../../api/guest-main/newspace";

export const useNewSpaces = () => {
  return useQuery({
    queryKey: ["newSpaces"],
    queryFn: fetchNewSpaces,
  });
};
