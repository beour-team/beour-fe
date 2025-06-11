import {
  barista,
  dish,
  etc,
  film,
  fleamarket,
  group,
} from "../../assets/theme";

// 카테고리는 지정이라서 백엔드 요청 필요 없을 듯
// 어떤 종류있는지만 확인
export const UseCategoryData = [
  { imgSrc: group, label: "단체 모임" },
  { imgSrc: dish, label: "요리 연습" },
  { imgSrc: barista, label: "바리스타 실습" },
  { imgSrc: fleamarket, label: "플리마켓" },
  { imgSrc: film, label: "촬영" },
  { imgSrc: etc, label: "기타" },
];
