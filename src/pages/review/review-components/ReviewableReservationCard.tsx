import { useNavigate } from "react-router-dom";
import {
  formatDateWithDay,
  formatTimeToHHMM,
} from "../../../utils/data-formatter";
import { over30Days } from "../../../utils/over-30days";
import { review } from "../../../assets/theme";
import type { ReviewableReservation } from "../../../api/Review/ReviewableList";

interface ReviewableReservationCardProps {
  reservation: ReviewableReservation;
}

const ReviewableReservationCard = ({
  reservation,
}: ReviewableReservationCardProps) => {
  const navigate = useNavigate();
  const isExpired = over30Days(reservation.date);
  const remainingDays = Math.max(
    0,
    30 -
      Math.floor(
        (new Date().getTime() - new Date(reservation.date).getTime()) /
          (1000 * 60 * 60 * 24)
      )
  );

  const handleReviewClick = () => {
    if (!isExpired) {
      // 리뷰 작성 페이지로 이동 (실제 구현시 적절한 경로로 변경)
      navigate(`/review/write/${reservation.reservationId}`);
    }
  };

  const handleExpiredClick = () => {
    // 리뷰 작성 기한 만료된 항목 클릭
    console.log("리뷰 작성 기한 만료된 항목", reservation.reservationId);
  };

  return (
    <div className="py-[1.6rem] border-b border-[#ECECEC]">
      <div className="flex gap-[1.6rem]">
        {/* 공간 이미지 - 임시 플레이스홀더 */}
        <div className="w-[7.5rem] h-[7.5rem] rounded-[1.2rem] bg-cr-200 flex items-center justify-center">
          <span className="text-cr-500 text-12-Medium">이미지</span>
        </div>

        {/* 공간 정보 */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="text-16-SemiBold text-cr-900 mb-[0.8rem] truncate">
              {reservation.spaceName}
            </h3>
            <p className="text-14-Medium text-cr-600 mb-[1.2rem]">
              {formatDateWithDay(reservation.date)}{" "}
              {formatTimeToHHMM(reservation.startTime)} -{" "}
              {formatTimeToHHMM(reservation.endTime)} {reservation.guestCount}인
            </p>

            {/* 사용 목적 태그 */}
            <div className="flex gap-[0.8rem] mb-[1.6rem] flex-wrap">
              <span className="inline-flex items-center px-[1.2rem] py-[0.4rem] bg-[#E3F2FD] rounded-[1.4rem] text-13-Medium text-[#4285F4] whitespace-nowrap">
                {reservation.usagePurpose}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 리뷰 버튼 영역 */}
      <div className="mt-[1.6rem]">
        {!isExpired ? (
          <>
            <button
              onClick={handleReviewClick}
              className="w-full h-[5rem] rounded-[1rem] bg-[#4285F4] flex items-center justify-center gap-[0.8rem]"
            >
              <img src={review} alt="리뷰 아이콘" className="w-[2.4rem]" />
              <span className="text-16-Medium text-white">리뷰 쓰기</span>
            </button>
            {remainingDays <= 3 && (
              <p className="text-13-Medium text-[#FF6B6B] text-center mt-[0.8rem]">
                리뷰 작성 가능 기한이 {remainingDays}일 남았어요
              </p>
            )}
          </>
        ) : (
          <button
            onClick={handleExpiredClick}
            disabled
            className="w-full h-[5rem] rounded-[1rem] bg-[#E9E9E9] flex items-center justify-center cursor-not-allowed"
          >
            <span className="text-16-Medium text-[#999999]">
              리뷰 작성 기한 만료
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewableReservationCard;
