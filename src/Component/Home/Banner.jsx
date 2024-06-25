import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import banner2 from '../../../public/Banner/02.webp'
import banner3 from '../../../public/Banner/03.webp'
import banner4 from '../../../public/Banner/04.webp'
import banner5 from '../../../public/Banner/05.jpg'

const Banner = () => {
    return (
        <div className="h-50">
            <Carousel className="text-center" autoPlay interval={2000} infiniteLoop showThumbs={false} showStatus={false} stopOnHover={false}>
                <div>
                <img src={banner2} />
                </div>
                <div>
                <img src={banner3} />
                </div>
                <div>
                <img src={banner4} />
                </div>
                <div>
                <img src={banner5} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;