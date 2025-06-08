import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Banner = () => {
  const dummyImages = [
    'https://img.freepik.com/free-photo/abstract-luxury-gold-yellow-gradient-studio-wall-well-use-as-background-layout-banner-product-presentation_1258-56101.jpg?semt=ais_hybrid&w=740',
    'https://img.freepik.com/premium-photo/abstract-background-design-rough-caribbean-green-color_851755-75771.jpg?semt=ais_hybrid&w=740'
  ];

  return (
    <div className="w-full h-34 md:h-56 px-[2rem] mb-6">
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
