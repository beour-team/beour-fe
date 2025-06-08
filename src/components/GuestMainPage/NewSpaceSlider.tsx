import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import NewSpaceUpload from "./NewSpaceUpload";

type NewSpace = {
  thumbnail_url: string;
  location: string;
  name: string;
  price_per_hour: number;
};

type NewSpaceSliderProps = {
  spaces: NewSpace[];
};

const NewSpaceSlider = ({ spaces }: NewSpaceSliderProps) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.85,
      spacing: 3,
    },
    mode: "free",
  });

  return (
    <div
      ref={sliderRef}
      className="keen-slider py-2 max-w-full overflow-hidden box-border"
    >
      {spaces.map((space, idx) => (
        <div className="keen-slider__slide box-border" key={idx}>
          <NewSpaceUpload space={space} spaceId={idx} />
        </div>
      ))}
    </div>
  );
};

export default NewSpaceSlider;
