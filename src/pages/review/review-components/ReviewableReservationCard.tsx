// 페이지 라우팅을 위한 React Router Hook
import { useNavigate } from "react-router-dom";
// 날짜와 시간을 사용자에게 보기 좋게 포맷팅하는 유틸리티 함수들
import {
  formatDateWithDay,
  formatTimeToHHMM,
} from "../../../utils/data-formatter";
// 리뷰 아이콘 이미지
import { review } from "../../../assets/theme";
// 리뷰 작성 가능한 예약 데이터의 타입 정의
import type { ReviewableReservation } from "../../../api/Review/ReviewableList";

// 컴포넌트에 전달되는 props 타입 정의
interface ReviewableReservationCardProps {
  reservation: ReviewableReservation; // 리뷰 작성 가능한 예약 정보
}

const ReviewableReservationCard = ({
  reservation,
}: ReviewableReservationCardProps) => {
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  // 리뷰 작성 버튼 클릭 시 실행되는 함수
  const handleReviewClick = () => {
    // 리뷰 작성 페이지로 이동
    navigate(`/review/write/${reservation.reservationId}`);
  };

  return (
    /* 메인 카드 컨테이너 - 하단 구분선이 있는 패딩 영역 */
    <div className="py-[1.6rem] border-b border-[#ECECEC]">
      {/* 상단 영역: 이미지와 공간 정보를 가로로 배치 */}
      <div className="flex gap-[1.6rem]">
        {/* 공간 썸네일 이미지 영역 */}
        {reservation.thumbnailUrl && reservation.thumbnailUrl.trim() !== "" ? (
          <img
            src={reservation.thumbnailUrl}
            alt={reservation.spaceName}
            className="w-[7.5rem] h-[7.5rem] rounded-[1.2rem] object-cover"
            onError={(e) => {
              // 이미지 로드 실패시 플레이스홀더로 교체 (콘솔 로그 제거)
              e.currentTarget.style.display = "none";
              const placeholder = e.currentTarget
                .nextElementSibling as HTMLElement;
              if (placeholder) {
                placeholder.style.display = "flex";
              }
            }}
          />
        ) : null}
        <div
          className="w-[7.5rem] h-[7.5rem] rounded-[1.2rem] bg-cr-200 flex items-center justify-center"
          style={{
            display:
              reservation.thumbnailUrl && reservation.thumbnailUrl.trim() !== ""
                ? "none"
                : "flex",
          }}
        >
          <span className="text-cr-500 text-12-Medium">이미지</span>
        </div>

        {/* 공간 상세 정보 영역 */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* 공간명 표시 - 길면 말줄임표 처리 */}
            <h3 className="text-16-SemiBold text-cr-900 mb-[0.8rem] truncate">
              {reservation.spaceName}
            </h3>
            {/* 예약 일시와 인원 정보 표시 */}
            <p className="text-14-Medium text-cr-600 mb-[1.2rem]">
              {formatDateWithDay(reservation.date)}{" "}
              {formatTimeToHHMM(reservation.startTime)} -{" "}
              {formatTimeToHHMM(reservation.endTime)} {reservation.guestCount}인
            </p>

            {/* 공간 사용 목적 태그 표시 */}
            <div className="flex gap-[0.8rem] mb-[1.6rem] flex-wrap">
              <span className="inline-flex items-center px-[1.2rem] py-[0.4rem] bg-[#E3F2FD] rounded-[1.4rem] text-13-Medium text-[#4285F4] whitespace-nowrap">
                {reservation.usagePurpose}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 영역: 리뷰 작성 버튼 */}
      <div className="mt-[1.6rem]">
        {/* 리뷰 작성 버튼 */}
        <button
          onClick={handleReviewClick}
          className="w-full h-[5rem] rounded-[1rem] bg-[#4285F4] flex items-center justify-center gap-[0.8rem]"
        >
          <img src={review} alt="리뷰 아이콘" className="w-[2.4rem]" />
          <span className="text-16-Medium text-white">리뷰 쓰기</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewableReservationCard;
