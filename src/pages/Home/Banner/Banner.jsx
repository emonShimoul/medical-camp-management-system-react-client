import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import img1 from "../../../assets/banner/banner1.jpg";
import img2 from "../../../assets/banner/banner2.jpg";
import img3 from "../../../assets/banner/banner3.jpg";
import img4 from "../../../assets/banner/banner4.jpg";

const Banner = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const bannerData = [
    {
      image: img1,
      title: "Free Health Checkups",
      subtitle: "Join our expert-led medical camps",
    },
    {
      image: img2,
      title: "Trusted Medical Volunteers",
      subtitle: "Care you can count on",
    },
    {
      image: img3,
      title: "Modern Facilities",
      subtitle: "Tech-enabled diagnostics and services",
    },
    {
      image: img4,
      title: "Serving Communities",
      subtitle: "Empowering healthier lives",
    },
  ];

  return (
    <>
      {/* Main Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#0f766e", // emerald-700
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {bannerData.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={slide.image}
              className="w-full h-[calc(100vh-110px)] object-cover rounded-lg"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10 flex items-center px-8 md:px-16">
              <div className="text-white max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-emerald-300 drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 drop-shadow-sm">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-2 px-2 md:px-16"
      >
        {[img1, img2, img3, img4].map((img, i) => (
          <SwiperSlide
            key={i}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
          >
            <img
              className="h-20 w-full object-cover"
              src={img}
              alt={`Thumb ${i + 1}`}
            />
            {/* Blackish overlay for blur effect */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition duration-200 rounded-lg"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
