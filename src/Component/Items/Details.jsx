import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link, useParams } from "react-router-dom";

const Details = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/items/${id}`);
                if (!response.ok) {
                    throw new Error('Food not found');
                }
                const data = await response.json();
                setDetails(data);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchDetails();
    }, [id]);

    if (!details) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <p className="text-center">Please wait, food details loading...</p>
                    <div className="loading loading-bars loading-lg text-lime-800 mt-4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="m-4 grid place-items-center gap-4">
            <Helmet>
                <title>Food Court | Details</title>
            </Helmet>
            <div key={details.id} className="w-full mt-32">
                <div className=" shadow-xl h-full border-4 border-b-lime-700 bg-lime-200">
                    <div className="flex">
                        <div className="w-1/2">
                            <img src={details.image} className="rounded-xl lg:h-full" />
                        </div>

                        <div className="w-1/2 p-4">
                            <h2 className="card-title text-red-700 mx-auto text-3xl">{details.name}</h2>
                            <p className="font-bold text-xl">{details.short_details}</p>
                            <p>{details.long_details}</p>
                            <div className="flex mt-2 text-red-700 font-semibold text-center gap-5">
                                <p>Price: {details.price}$</p>
                                <p>Origin: {details.origin}</p>
                                <p>Rating:
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
                            <button className="btn bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold w-full">
                                <Link to='/items' className="flex gap-4 text-xl items-center"> <FaArrowLeft />Back</Link>
                            </button>
                        </div>
                        </div>


                      
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Details;
