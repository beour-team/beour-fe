import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import banner1 from "../assets/bannerImg.png";
import banner2 from "../assets/bannerImg.png";
import banner3 from "../assets/bannerImg.png";

const Banner = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    drag: true,
    created: (slider) => {
      setInterval(() => slider.next(), 3000);
    },
  });

  const banners = [
    { src: banner1, text: "공간 자랑 이벤트 진행중" },
    { src: banner2, text: "텍스트2" },
    { src: banner3, text: "텍스트3" },
  ];

  return (
    <div className="py-[1rem] cursor-pointer">
      <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="keen-slider__slide relative w-full aspect-[394/101]"
          >
            <img
              src={banner.src}
              alt={`배너 ${index + 1}`}
              className="w-full object-cover"
            />
            <div className="absolute bottom-[2rem] left-[2rem] text-white text-[1.5rem] font-regular drop-shadow-md">
              {banner.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
