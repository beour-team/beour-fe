import { useState } from "react";
import PageHeader from "../../../components/header/PageHeader";
import ReviewCard from "../../../components/review/ReviewCard";

const dummyReviews = [
  {
    id: 1,
    space_id: 1,
    nickname: "유딘딘",
    rating: 5,
    comment:
      "공간이 너무 좋아요. 특히 분위기가 너무 좋았고 가구들도 다 새거라 기분 좋게 사용했어요. 다음에 또 대여하게 된다면공간이 너무 좋아요. 특히 분위기가 너무 좋았고 가구들도 다 새거라 기분 좋게 사용했어요. 다음에 또 대여하게 된다면",
    created_at: "2025-05-12",
  },
  {
    id: 2,
    space_id: 1,
    nickname: "홍길동",
    rating: 3,
    comment:
      "무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.무난하게 사용했습니다. 위치가 좋아요.",
    created_at: "2025-05-10",
  },
];

const Review = () => {
  const [activeTab, setActiveTab] = useState("guest");
  const [reviews] = useState(dummyReviews);

  return (
    <div>
      <div className="px-[2rem] border-b border-cr-200">
        <PageHeader>리뷰 관리</PageHeader>
        <div className="h-[4.8rem] w-full bg-[#E9E9E9] flex items-center justify-between rounded-full">
          <div
            onClick={() => setActiveTab("guest")}
            className={`text-[1.4rem] font-medium h-[3.8rem] flex items-center w-[16.9rem] justify-center rounded-full ml-[0.8rem] cursor-pointer ${
              activeTab === "guest" ? "bg-[#3C3C3C] text-white" : "text-black"
            }`}
          >
            답글 작성
          </div>
          <div
            onClick={() => setActiveTab("host")}
            className={`text-[1.4rem] font-medium h-[3.8rem] flex items-center w-[16.9rem] justify-center rounded-full mr-[0.8rem] cursor-pointer ${
              activeTab === "host" ? "bg-[#3C3C3C] text-white" : "text-black"
            }`}
          >
            작성한 답글
          </div>
        </div>
        <p className="text-13-Medium text-cr-600 pt-[1.6rem] pb-[2rem]">
          총 {reviews.length}개
        </p>
      </div>

      <ReviewCard reviews={reviews} />
    </div>
  );
};

export default Review;
