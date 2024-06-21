import { FaArrowRight } from "react-icons/fa";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ food }) => {
    const { name, price, short_details, image, origin, id } = food;
    // const {name, price, short_details,long_details, rating,origin,image} =food;
    return (
        <div >
            <div className="card card-compact shadow-xl  bg-lime-200 border-4 border-b-lime-700">
                <figure><img src={image} alt="Food" className="rounded-xl p-4 card-image"/></figure>
                <div className="card-body">
                    <h2 className="card-title text-red-600 mx-auto text-2xl ">{name}</h2>
                    <p className="font-bold">{short_details}</p>
                    <div className="flex mt-2 f ont-semibold">
                        <p>Price: {price}$</p>
                        <p>Origin: {origin}</p>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold">
                            <Link to={`/food/${id}`} className="flex gap-2 mx-2">Details <FaArrowRight />
                            </Link> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;


