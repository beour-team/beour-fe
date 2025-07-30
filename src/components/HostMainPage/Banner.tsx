import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { hostmainbanner } from "../../assets/theme";

const Banner = () => {
  const dummyImages = [hostmainbanner];

  return (
    <div className="w-full h-[66px] mb-6">
      {/* 라운딩과 overflow는 Swiper에 적용 */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-xl overflow-hidden w-full h-full"
      >
        {dummyImages.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`배너 ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
