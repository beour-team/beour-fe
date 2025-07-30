// yarn add keen-slider 라이브러리 설치 필요
import { useKeenSlider } from "keen-slider/react"; //keen-slider 라이브러리 사용
import "keen-slider/keen-slider.min.css";
import { useBanner } from "../../../hooks/guest-main/UseBanner";

const Banner = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    drag: true,
    created: (slider) => {
      setInterval(() => slider.next(), 3000);
    },
  });

  const { data, isLoading, isError } = useBanner();
  if (isLoading) return <div>배너 로딩 중...</div>;
  if (isError) return <div> </div>;

  return (
    <div className="py-[2rem]">
      <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
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
