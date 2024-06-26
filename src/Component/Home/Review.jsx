import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

const Review = () => {
    const [ourReview, setOurReview] = useState([]);

    useEffect(() => {
        fetch('/review.json')
            .then(res => res.json())
            .then(data => {
                setOurReview(data);
            });
    }, []);

    return (
        <div className='m-4 lg:m-12 mt-14' >
            <hr className='border-red-800 mx-auto' style={{ width: '40%' }} />
            <small className="text-center text-red-800"><p>
                 Our Customers Review
            </p>
            </small>
            <div className='w-50 text-center justify-center'>
                <p className='text-center font-bold lg:text-5xl text-3xl italic text-red-800 mb-4'>
                    <p>
                    What People Say
                    </p>
                    <hr className='border-red-800 mx-auto' style={{ width: '40%' }} />
                </p>
            </div>

            <div className='bg-base-300 '>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
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
                            className="text-center review-slide bg-blue-500 text-white p-2"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '250px',
                            }}

                        >
                            <div>
                                <p>{review.review}</p>
                                <hr />
                                <p className="text-center font-bold text-black">{review.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Review;
