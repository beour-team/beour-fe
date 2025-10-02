// yarn add keen-slider 라이브러리 설치 필요
//keen-slider 라이브러리 사용
import "keen-slider/keen-slider.min.css";
import { useBanner } from "../../../hooks/guest-main/UseBanner";
import { useEffect, useState } from "react";
import KeenSlider from "keen-slider";

const Banner = () => {
  const { data, isError } = useBanner();
  const [sliderRef, setSliderRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sliderRef && data && data.length > 0) {
      const slider = new KeenSlider(sliderRef, {
        loop: true,
        slides: { perView: 1 },
        drag: true,
      });

      const interval = setInterval(() => slider.next(), 3000);
      return () => {
        clearInterval(interval);
        slider.destroy();
      };
    }
  }, [sliderRef, data]);

  if (isError || !data) return <div> </div>;

  return (
    <div className="py-[2rem]">
      <div
        ref={setSliderRef}
        className="keen-slider rounded-lg overflow-hidden"
      >
        {data?.map((banner, index) => (
          <div
            key={banner.bannerId}
            className="keen-slider__slide relative w-full aspect-[394/140]"
          >
            <img
              src={banner.imageUrl}
              alt={`배너 ${index + 1}`}
              className="w-full object-cover"
            />
            {/* 문구 데이터 없음 */}
            {/* <div className="absolute bottom-[2rem] left-[2rem] text-white text-[1.6rem] font-semibold drop-shadow-md">
              {banner.title}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
