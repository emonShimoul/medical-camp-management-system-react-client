import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Import Swiper styles
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
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img
            src={img1}
            className="w-full h-[calc(100vh-110px)] object-fill"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img2}
            className="w-full h-[calc(100vh-110px)] object-fill"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img3}
            className="w-full h-[calc(100vh-110px)] object-fill"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img4}
            className="w-full h-[calc(100vh-110px)] object-fill"
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-1"
      >
        <SwiperSlide>
          <img className="h-20 w-full" src={img1} />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-20 w-full" src={img2} />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-20 w-full" src={img3} />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-20 w-full" src={img4} />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
