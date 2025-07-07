import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

interface Props {
  imageUrls: string[];
}

const SpaceImageSlider = ({ imageUrls }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    initial: 0,
    loop: true,
  });

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider overflow-hidden">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="keen-slider__slide flex justify-center items-center"
          >
            <img
              src={url}
              alt={`space-image-${index}`}
              className="w-full h-[24.8rem] object-cover"
              style={{
                imageRendering: "auto",
              }}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 bg-[#D9D9D9] bg-opacity-25 text-white text-9-Regular px-3 py-2 rounded-[0.8rem]">
        {currentSlide + 1} / {imageUrls.length}
      </div>
    </div>
  );
};

export default SpaceImageSlider;
