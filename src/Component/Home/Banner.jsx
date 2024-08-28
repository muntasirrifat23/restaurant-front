import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// import banner1 from "../../../public/Banner/B1.jpg";
import banner1 from "../../../public/Banner/B1.jpg";
import banner2 from "../../../public/Banner/B2.jpg";
import banner3 from "../../../public/Banner/B3.jpg";
import banner4 from "../../../public/Banner/B4.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  const imageText = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "20px 20px",
    borderRadius: "5px",
    textAlign: "center",
  };

  return (
    <div className="hero-content lg:mx-8">
      <div className="mt-20 w-full lg:mt-0">
      <Carousel
        interval={2000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        className="text-center"
      >
        <div>
          <img src={banner1} />
          <div style={imageText}>
            <p className="mb-4">
              Experience the delight of gourmet cuisine, where each dish is
              carefully crafted using the finest ingredients. From tender, juicy
              meats to fresh, vibrant vegetables, our meals are a celebration of
              flavor and quality.
            </p>
            <Link to='/items' className="bg-white text-orange-700 font-bold px-4 py-2 rounded-xl border-l-4 border-r-4 border-orange-700" ><button>Order Now</button></Link>
          </div>
        </div>

        <div>
          <img src={banner2} />
          <div style={imageText}>
            <p className="mb-4">
              Our culinary offerings combine traditional recipes with modern
              flair, ensuring a dining experience that is both comforting and
              exciting. Each plate is presented with care, reflecting our
              commitment to both taste and aesthetics. Enjoy your meal in an
              atmosphere designed to enhance your overall dining experience.
            </p>
            <Link to='/items' className="bg-white text-orange-600 font-bold px-4 py-2 rounded-xl border-l-2 border-r-2 border-orange-600" ><button>Order Now</button></Link>
          </div>
        </div>

        <div>
          <img src={banner3} />
          <div style={imageText}>
            <p className="mb-4">
              Taste the freshness in every bite, with ingredients sourced from
              trusted suppliers to bring you the best nature has to offer. Our
              chefs take pride in creating dishes that not only satisfy your
              hunger but also nourish your soul. Every dish is a journey into a
              world of rich, diverse flavors.
            </p>
            <Link to='/items' className="bg-white text-orange-600 font-bold px-4 py-2 rounded-xl border-l-2 border-r-2 border-orange-600" ><button>Order Now</button></Link>
          </div>
        </div>

        <div>
          <img src={banner4} />
          <div style={imageText}>
            <p className="mb-4">
              Indulge in a culinary experience that goes beyond the ordinary,
              with dishes that are as pleasing to the eye as they are to the
              palate. Each creation is a testament to our dedication to quality
              and creativity, ensuring that your meal is not just food, but a
              memorable experience.
            </p>
            <Link to='/items' className="bg-white text-orange-600 font-bold px-4 py-2 rounded-xl border-l-2 border-r-2 border-orange-600" ><button>Order Now</button></Link>
          </div>
        </div>
      </Carousel>
      </div>
      
    </div>
  );
};

export default Banner;
