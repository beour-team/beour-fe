import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/header/PageHeader";
import { useReviewReservationDetail } from "../../hooks/Review/useReviewReservationDetail";
import { useCreateReview } from "../../hooks/Review/useCreateReview";
import { camera, star, emptyStar, cancel_dark } from "../../assets/theme";

const GuestCreateReview = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();

  // 별점 상태
  const [rating, setRating] = useState(0);
  // 리뷰 텍스트 상태
  const [reviewText, setReviewText] = useState("");
  // 이미지 업로드 상태
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  // 예약 정보 조회
  const {
    data: reservationDetail,
    isLoading,
    error,
  } = useReviewReservationDetail(reservationId ? parseInt(reservationId) : 0);

  // 리뷰 작성 훅
  const {
    createReviewAsync,
    isLoading: isSubmitting,
    error: submitError,
    isSuccess,
  } = useCreateReview();

  // 별점 클릭 핸들러
  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && uploadedImages.length < 10) {
      const newImages = Array.from(files).slice(0, 10 - uploadedImages.length);
      // 각 파일에 고유한 timestamp를 추가하여 같은 파일도 구분되도록 함
      const filesWithTimestamp = newImages.map((file) => {
        // 새로운 File 객체를 생성하여 같은 파일도 다른 객체로 취급
        return new File([file], file.name, {
          type: file.type,
          lastModified: Date.now(), // 현재 시간을 추가하여 고유성 보장
        });
      });
      setUploadedImages((prev) => [...prev, ...filesWithTimestamp]);
    }
    // 같은 파일을 다시 선택할 수 있도록 input value 초기화
    event.target.value = "";
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = (indexToDelete: number) => {
    setUploadedImages((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  // 리뷰 제출 핸들러
  const handleSubmit = async () => {
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }
    if (reviewText.trim() === "") {
      alert("후기를 작성해주세요.");
      return;
    }
    if (!reservationId) {
      alert("예약 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      console.log("🚀 [리뷰 제출] 시작:", {
        reservationId: parseInt(reservationId),
        rating,
        content: reviewText,
        imageCount: uploadedImages.length,
      });

      await createReviewAsync({
        reservationId: parseInt(reservationId),
        rating,
        content: reviewText,
        images: uploadedImages,
      });

      console.log("✅ [리뷰 제출] 완료");
      alert("리뷰가 작성되었습니다!");
      navigate(-1); // 이전 페이지로 돌아가기
    } catch (error) {
      console.error("❌ [리뷰 제출] 실패:", error);
      alert(
        error instanceof Error ? error.message : "리뷰 작성에 실패했습니다."
      );
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
  };

  // 시간 포맷팅
  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white px-[2rem] flex items-center justify-center">
        <div className="text-16-Medium">로딩 중...</div>
      </div>
    );
  }

  if (error || !reservationDetail) {
    return (
      <div className="min-h-screen bg-white px-[2rem] flex items-center justify-center">
        <div className="text-center">
          <p className="text-16-Medium text-red-500 mb-[0.8rem]">
            예약 정보를 불러올 수 없습니다
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-14-Medium text-blue-500"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-[2rem]">
        <PageHeader>리뷰 작성</PageHeader>
      </div>

      <div className="px-[2rem] pb-[10rem]">
        {/* 예약 정보 카드 */}
        <div className="py-[3rem]">
          <div className="flex gap-[1.6rem]">
            {/* 공간 썸네일 이미지 */}
            {reservationDetail.thumbnailUrl &&
            reservationDetail.thumbnailUrl.trim() !== "" ? (
              <img
                src={reservationDetail.thumbnailUrl}
                alt={reservationDetail.spaceName}
                className="w-[7.5rem] h-[7.5rem] rounded-[1.2rem] object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-[7.5rem] h-[7.5rem] rounded-[1.2rem] bg-cr-200 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-500 text-12-Medium">이미지</span>
              </div>
            )}

            {/* 예약 정보 */}
            <div className="flex-1">
              <h3 className="text-16-SemiBold text-gray-900 mb-[0.8rem]">
                {reservationDetail.spaceName}
              </h3>
              <p className="text-14-Medium text-gray-600 mb-[0.8rem]">
                {formatDate(reservationDetail.date)}{" "}
                {formatTime(reservationDetail.startTime)} -{" "}
                {formatTime(reservationDetail.endTime)}{" "}
                {reservationDetail.guestCount}인
              </p>
              <span className="inline-flex items-center px-[1.2rem] py-[0.4rem] bg-blue-50 rounded-[1.4rem] text-13-Medium text-blue-600">
                {reservationDetail.usagePurpose}
              </span>
            </div>
          </div>
        </div>

        {/* 별점 선택 */}
        <div className="mb-[4rem]">
          <h4 className="text-18-SemiBold text-gray-900 mb-[2rem]">
            공간에 어느정도 만족하셨나요?
          </h4>
          <div className="flex  gap-[1rem]">
            {Array.from({ length: 5 }, (_, index) => (
              <button
                key={index}
                onClick={() => handleStarClick(index)}
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src={index < rating ? star : emptyStar}
                  alt={`별점 ${index + 1}`}
                  className="w-[3rem] h-[3rem]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div className="mb-[4rem]">
          <h4 className="text-18-SemiBold text-gray-900 mb-[2rem]">
            이미지를 추가해주세요
          </h4>
          <div
            className="flex gap-[0.8rem] overflow-x-auto py-[0.5rem] scrollbar-hide scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* 업로드 버튼 */}
            {uploadedImages.length < 10 && (
              <label className="text-14-Medium flex flex-col items-center justify-center w-[8rem] h-[8rem] bg-cr-100 rounded-[1rem] cursor-pointer text-cr-500 flex-shrink-0 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <img
                  src={camera}
                  alt="카메라 아이콘"
                  className="w-[2.4rem] h-[2.4rem] mb-[0.4rem]"
                />
                {uploadedImages.length}/10
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}

            {/* 업로드된 이미지 미리보기 */}
            {uploadedImages.map((image, index) => (
              <div
                key={`${image.name}-${image.lastModified}-${index}`}
                className="relative w-[8rem] h-[8rem] flex-shrink-0"
              >
                <div className="w-full h-full rounded-[1rem] overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`업로드 이미지 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <img
                  src={cancel_dark}
                  alt="삭제 아이콘"
                  className="w-[2rem] h-[2rem] absolute -top-[0.6rem] -right-[0.8rem] z-10 rounded-full cursor-pointer border border-cr-white"
                  onClick={() => handleImageDelete(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 후기 작성 */}
        <div className="mb-[4rem]">
          <h4 className="text-18-SemiBold text-gray-900 mb-[2rem]">
            후기를 작성해주세요
          </h4>
          <div className="relative">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="공간에 대한 후기를 자세하게 적어주세요. ex) 공간 분위기, 구비 물품, 위치, 용도 등"
              className="w-full h-[20rem] p-[2rem] rounded-[1rem] resize-none text-14-Medium placeholder-gray-400 leading-[2.6rem] focus:outline-none focus:border-blue-500 bg-cr-100"
              maxLength={500}
            />
            <div className="absolute bottom-[1.6rem] right-[2rem] text-12-Medium text-gray-400">
              {reviewText.length}/500 자
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="bg-white border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || reviewText.trim() === "" || isSubmitting}
            className={`w-full h-[5.2rem] rounded-[1rem] text-16-SemiBold transition-colors ${
              rating === 0 || reviewText.trim() === "" || isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "작성 중..." : "작성 완료"}
          </button>

          {/* 에러 메시지 표시 */}
          {submitError && (
            <p className="text-14-Medium text-red-500 text-center mt-[1rem]">
              {submitError.message}
            </p>
          )}

          {/* 성공 메시지 표시 */}
          {isSuccess && (
            <p className="text-14-Medium text-green-500 text-center mt-[1rem]">
              리뷰가 성공적으로 작성되었습니다!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestCreateReview;
