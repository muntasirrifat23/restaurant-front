import { FaArrowLeft, FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Link, useLoaderData } from "react-router-dom";

const Details = () => {

    const details = useLoaderData();

    if (!Array.isArray(details)) {
        return (
            <div>
                Error: Data is not in the expected format.
            </div>
        );
    }
    return (
        <div className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {
                details.map(({ id, name, price, short_details, long_details, rating, origin, image }) =>
                    <div key={id} className="f-full">
                        <div className="card card-compact shadow-xl  h-full border-4 border-b-lime-700 bg-lime-200">
                            <figure><img src={image} alt="Food" className="rounded-xl p-4  w-full" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-red-700 mx-auto text-3xl">{name}</h2>
                                <p className="font-bold text-xl">{short_details}</p>
                                <p>{long_details}</p>
                                <div className="flex mt-2 text-red-700 font-semibold text-center">
                                    <p>Price: {price}$</p>
                                    <p>Origin: {origin}</p>
                                    <p>Rating:
                                        {rating}
                                        <Rating className="mr-"
                                            initialRating={rating}
                                            emptySymbol={<FaRegStar />}
                                            placeholderSymbol={<FaRegStar />}
                                            fullSymbol={<FaStar />}
                                            readonly
                                        />
                                    </p>
                                </div>
                                <div className="card-actions justify-center">
                                    <button className="btn bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold">
                                        <Link to='/' className="flex gap-2 mx-2"> <FaArrowLeft />Back</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Details;
