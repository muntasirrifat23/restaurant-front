import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
  }, [id]);

  if (!details) {
    return (
      <div className="hero-content mx-auto">
        <div className="flex items-center justify-center mt-32">
          <div className="flex flex-col items-center ">
            <p>Please wait, food details loading...</p>
            <div className="loading loading-bars loading-lg text-lime-800 mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center gap-4 mx-auto">
      <Helmet>
        <title>Food Court | Details</title>
      </Helmet>
      <div>
        <div key={details.id} className="w-full mt-28">
          <p className="font-semibold text-red-700 text-3xl text-center mb-5">
            Details of {details.name}
          </p>

          <div className="card-body shadow-xl h-full border-4 border-b-red-700 lg:mx-20 mx-10 mb-10 rounded-lg">
            <div className="lg:flex lg:justify-around">
              <div className=" w-full">
                <img src={details.image} className="rounded-xl lg:h-full w-full" />
              </div>

              <div className="p-4">
                <h2 className="card-title text-red-700 text-3xl mb-2 text-center">
                  {details.name}
                </h2>
                <p className="font-bold text-xl mb-2">{details.short_details}</p>
                <p>{details.long_details}</p>
                <div className="flex mt-2 text-red-700 font-semibold  gap-5 justify-around">
                  <p>Price: {details.price}$</p>
                  <p>Origin: {details.origin}</p>
                  <p>
                    Rating:
                    <Rating
                      initialRating={details.rating}
                      emptySymbol={<FaRegStar />}
                      placeholderSymbol={<FaRegStar />}
                      fullSymbol={<FaStar />}
                      readonly
                    />
                  </p>
                </div>

                <div className="card-actions justify-center mt-4">
                  <Link to="/items" className="flex gap-4 text-xl items-center px-10">
                    <button className="btn bg-gradient-to-r from-red-500 via-red-500 to-red-500 text-white font-bold ">
                      <FaArrowLeft />
                      Back
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
