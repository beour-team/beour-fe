import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import NewSpaceUpload from "./NewSpaceUpload";
import type { NewSpace } from "../../../types/guest-main/NewSpaceType";

type NewSpaceSliderProps = {
  spaces: NewSpace[];
};

const NewSpaceSlider = ({ spaces }: NewSpaceSliderProps) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.65, // 뷰포트 기준으로 슬라이드 크기 결정
      spacing: 16, // 슬라이드 간 간격
    },
    mode: "free", //드래그가 끝난 후 적용되는 애니메이션
  });

  return (
    <div
      ref={sliderRef}
      className="keen-slider max-w-full overflow-hidden box-border"
    >
      {spaces.map((space, idx) => (
        <div className="keen-slider__slide box-border" key={idx}>
          <NewSpaceUpload space={space} />
        </div>
      ))}
    </div>
  );
};

export default NewSpaceSlider;
