import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import food1 from '../../../public/HomeFood/HF1.webp'
import food2 from '../../../public/HomeFood/HF2.webp'
import food3 from '../../../public/HomeFood/HF3.webp'
import food4 from '../../../public/HomeFood/HF4.webp'
import food5 from '../../../public/HomeFood/HF5.webp'
import food6 from '../../../public/HomeFood/HF6.webp'
const HomeFood = () => {
    return (
        <div>
             <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <p className='text-center text-white bg-red-800 font-semibold'>Chicken</p>
            <img src={food1} />
        </SwiperSlide>
        <SwiperSlide>
        <p className='text-center text-white bg-red-800 font-semibold'>Mutton</p>
            <img src={food2} />
        </SwiperSlide>
        <SwiperSlide>
        <p className='text-center text-white bg-red-800 font-semibold'>Beef</p>
            <img src={food3} />
        </SwiperSlide>
        <SwiperSlide>
        <p className='text-center text-white bg-red-800 font-semibold'>Pizza</p>
            <img src={food4} />
        </SwiperSlide>
        <SwiperSlide>
        <p className='text-center text-white bg-red-800 font-semibold'>Burger</p>
            <img src={food5} />
        </SwiperSlide>
        <SwiperSlide>
        <p className='text-center text-white bg-red-800 font-semibold'>Tacos</p>
            <img src={food6} />
        </SwiperSlide>
      </Swiper>
        </div>
    );
};

export default HomeFood;