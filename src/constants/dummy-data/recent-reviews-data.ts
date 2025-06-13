import { space1, space2 } from "../../assets/theme";

// 공간 이름 필요(백엔드)
export const RecentReviews = [
  {
    id: 1,
    space_id: 2001,
    nickname: "유딘딘",
    rating: 5,
    comment:
      "공간이 너무 좋아요. 특히 분위기가 너무 좋았고 가구들도 다 새 거라 기분 좋게 사용했어요. 다음에 또 방문하게 된다면 무조건 여기로 이용할 거에요.",
    created_at: "2025-05-10T13:00:00",
    name: "게임 파티룸 플레이앤 삼성역점",
    review_images: [
      {
        image_url: space1,
      },
    ],
  },
  {
    id: 2,
    space_id: 2002,
    nickname: "사용자2",
    rating: 4,
    comment:
      "좋은 공간이지만 약간 비쌈. 글자 수 길어지면 어떻게 되는지 확인하는 용도. 글자 수 길어지면 어떻게 되는지 확인하는 용도. 글자 수 길어지면 어떻게 되는지 확인하는 용도. 글자 수 길어지면 어떻게 되는지 확인하는 용도. 글자 수 길어지면 어떻게 되는지 확인하는 용도.",
    name: "게임 파티룸 플레이앤 삼성역점",
    created_at: "2025-05-09T14:45:00",
    review_images: [
      {
        image_url: space2,
      },
    ],
  },
];
