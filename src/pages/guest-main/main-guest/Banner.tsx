// yarn add keen-slider 라이브러리 설치 필요
import { useKeenSlider } from "keen-slider/react"; //keen-slider 라이브러리 사용
import "keen-slider/keen-slider.min.css";
import { BannerData } from "../../../constants/banner-data";

const Banner = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    drag: true,
    created: (slider) => {
      setInterval(() => slider.next(), 3000);
    },
  });

  return (
    <div className="py-[2rem]">
      <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
        {BannerData.map((banner, index) => (
          <div
            key={index}
            className="keen-slider__slide relative w-full aspect-[394/140]"
          >
            <img
              src={banner.image_url}
              alt={`배너 ${index + 1}`}
              className="w-full object-cover"
            />
            <div className="absolute bottom-[2rem] left-[2rem] text-white text-[1.5rem] font-regular drop-shadow-md">
              {banner.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
