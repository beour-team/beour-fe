import {
  art,
  cafe,
  cooking,
  costume,
  etc,
  leather,
  restaurant,
} from "../../assets/theme";

// 카테고리는 지정이라서 백엔드 요청 필요 없을 듯
// 어떤 종류있는지만 확인
export const SpaceCategoryData = [
  { imgSrc: cafe, label: "카페" },
  { imgSrc: restaurant, label: "식당" },
  { imgSrc: cooking, label: "쿠킹 공방" },
  { imgSrc: leather, label: "가죽 공방" },
  { imgSrc: costume, label: "의상 공방" },
  { imgSrc: art, label: "아트 공방" },
  { imgSrc: etc, label: "기타" },
];
