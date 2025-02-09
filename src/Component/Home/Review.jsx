import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";

const Review = () => {
  const [ourReview, setOurReview] = useState([]);

  useEffect(() => {
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => {
        setOurReview(data);
      });
  }, []);

  return (
    <div className="m-4 lg:m-12 mt-14">
      <hr className="border-red-800 mx-auto" style={{ width: "40%" }} />
      <small className="text-center text-red-800">
        <p>Our Customers Review</p>
      </small>
      <div className="w-50 text-center justify-center">
        <p className="text-center font-bold lg:text-5xl text-3xl italic text-red-800 mb-4">
          <p>What People Say</p>
          <hr className="border-red-800 mx-auto" style={{ width: "40%" }} />
        </p>
      </div>

      <div>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {ourReview.map((review) => (
            <SwiperSlide
              key={review.id}
              className="text-center review-slide bg-lime-300 text-black p-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                width: "200px",
              }}
            >
              <div>
                <p>
                  <Rating
                    className="text-2xl mb-8"
                    initialRating={review.rating}
                    emptySymbol={<FaRegStar className="text-red-600" />}
                    placeholderSymbol={<FaRegStar className="text-red-600" />}
                    fullSymbol={<FaStar className="text-red-600" />}
                    readonly
                  />
                </p>
                <p className="mb-4">{review.review}</p>
                <hr />
                <p className="text-center font-bold text-black text-xl">
                  {review.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
