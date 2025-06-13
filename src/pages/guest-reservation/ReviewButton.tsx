import { review } from "../../assets/theme";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { over30Days } from "../../utils/over-30days";

interface ReviewButtonProps {
  date: string;
  hasReview: boolean;
}

const ReviewButton = ({ date, hasReview }: ReviewButtonProps) => {
  const nav = useNavigate();

  const isExpired = over30Days(date);

  const handleClick = () => {
    if (hasReview) {
      nav(PATHS.GUEST.REVIEW); // 마이페이지 리뷰 탭
    } else if (!isExpired) {
      nav(PATHS.GUEST.REVIEW); // 리뷰 작성 페이지
    }
  };

  let buttonText = "";
  let buttonStyle = "";
  let disabled = false;

  if (hasReview) {
    buttonText = "작성한 리뷰 보기";
    buttonStyle = "bg-cr-500";
  } else if (isExpired) {
    buttonText = "리뷰 작성 기간 만료";
    buttonStyle = "bg-cr-400";
    disabled = true;
  } else {
    buttonText = "리뷰 쓰기";
    buttonStyle = "bg-cr-blue";
  }

  return (
    <div className="my-[1.2rem]">
      <button
        className={`w-full h-[5rem] rounded-[1rem] ${buttonStyle} ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        onClick={handleClick}
        disabled={disabled}
      >
        <div className="flex items-center gap-5 justify-center">
          {buttonText === "리뷰 쓰기" && (
            <img src={review} alt="리뷰 이미지" className="w-[2.4rem]" />
          )}
          <div className="text-cr-white text-16-Medium">{buttonText}</div>
        </div>
      </button>
    </div>
  );
};

export default ReviewButton;
