import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeedbackAndRatings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["allFeedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading feedback...</p>;

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 bg-gray-50 rounded-lg shadow mb-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
        What Participants Say
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {feedbacks.map((fb) => (
          <SwiperSlide key={fb._id}>
            <div className="bg-white p-5 h-full rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-700 italic mb-3">"{fb.feedback}"</p>
              <Rating
                initialRating={fb.rating}
                readonly
                fullSymbol={<FaStar className="text-amber-400" />}
                emptySymbol={<FaRegStar className="text-gray-300" />}
              />
              <p className="text-sm text-gray-500 mt-2">— {fb.userEmail}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeedbackAndRatings;
