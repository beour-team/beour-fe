import { review } from "../../assets/theme";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";

const ReviewButton = () => {
  const nav = useNavigate();

  return (
    <div className="my-[1.2rem]">
      <button
        className="bg-cr-blue w-full h-[5rem] rounded-[1rem]"
        onClick={() => nav(PATHS.GUEST.REVIEW)}
      >
        <div className="flex items-center gap-5 justify-center">
          <img src={review} alt="리뷰 이미지" className="w-[2.4rem]" />
          <div className="text-cr-white text-16-Medium">리뷰 쓰기</div>
        </div>
      </button>
    </div>
  );
};

export default ReviewButton;
