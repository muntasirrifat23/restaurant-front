import {
  IoFastFoodOutline,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io5";
import image from "../../../public/main-icon.png";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white text-black border-2 border-black">
      <footer className="footer w-full text-center">
        <nav className="mx-auto">
          <img src={image} alt="logo" className="w-16 mx-auto rounded-xl" />
          <div className="text-2xl text-blue-800 font-bold italic mt-4">
            <p className="text-3xl">Authentic Best Foods in The Town</p>
            <p className="text-red-600 flex items-center justify-center gap-3 mt-2">
              Yummy Food at Food Court
              <IoFastFoodOutline />
            </p>
          </div>
        </nav>

        {/* Footer Middle */}
        <nav className="mx-auto text-center">
          <div className="text-center mt-8">
          <p className="font-bold mb-2 text-2xl">Food Court</p>
            <p>Head Office: House #29, Road #02, Sector #11</p>
            <p>Uttara, Dhaka, Bangladesh</p>
            <p>Phone: +8801234567890</p>
            <p>
              Email:
              <a
                href="mailto:www.foodcourt@gmail.com"
                className="ml-1 text-blue-600"
              >
                www.foodcourt@gmail.com
              </a>
            </p>
          </div>
        </nav>

        {/* Footer Right */}
        <nav className="mx-auto text-center">
          <div className="font-semibold mt-8 text-center">
            <p>Our Branches</p>
            <div className="flex justify-center gap-4 mt-2">
              <p className="underline">Uttara</p>
              <p className="underline">Banani</p>
              <p className="underline">Gulshan 2</p>
              <p className="underline">Mirpur 1</p>
            </div>
          </div>

          <div className="mx-auto">
            <p className="font-semibold mt-8 ">Social</p>
            <p className="flex justify-center text-blue-900 text-xl gap-4 mt-2 mx-auto">
              <a href="https://www.facebook.com" target="_blank">
                {" "}
                <IoLogoFacebook />
              </a>
              <a href="https://www.linkedin.com" target="_blank">
                <IoLogoLinkedin />
              </a>
              <a href="https://www.twitter.com" target="_blank">
                <IoLogoTwitter className="text-sky-600" />
              </a>
              <a href="https://www.youtube.com/" target="_blank">
                <IoLogoYoutube className="text-red-600" />
              </a>
            </p>
          </div>
        </nav>
      </footer>

      {/* Copyright Section */}
      {/* <aside className="mt-6 text-center">
        <p>Copyright © 2024 - All rights reserved by Food Court Ltd.</p>
      </aside> */}
    </div>
  );
};

export default Footer;
