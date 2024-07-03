import { FaArrowRight } from "react-icons/fa";
import "./Card.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaBangladeshiTakaSign, FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Card = ({ item }) => {
    const { name, price, short_details, image, origin, id, } = item;
    const {user} = useContext(AuthContext);

    const handleCart = (item) => {
        if(user && user.email){
            const cartData ={
                menuId : id,
                email: user.email,
                name, image, price, origin
            }
            axios.post('http://localhost:5000/cart', cartData)
            .then(res=>{
                console.log(res.data); 
                if(res.data.insertedId){
                Swal.fire("Food Added To The Cart");
                }
            })
        }
    }

    return (
        <div>
            <div className="card card-compact shadow-xl  bg-lime-200 border-4 border-b-lime-700">
                <figure><img src={image} alt="Food" className="rounded-xl p-4 cImage" /></figure>
                <div className="card-body ">
                    <h2 className="card-title  mx-auto text-2xl ">{name}</h2>
                    <p className="font-bold">{short_details}</p>
                    <div className="flex mt-2 font-semibold">
                        <p className="flex items-center text-center">Price:
                            <FaBangladeshiTakaSign></FaBangladeshiTakaSign> {price}
                        </p>
                        <p>Origin: {origin}</p>
                    </div>

                    {/* Details */}
                    <div className="card-actions justify-center">
                    <Link to={`/items/${id}`} className="flex gap-2 mx-2">
                        <button className="btn bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold">
                                Details <FaArrowRight />
                        </button>
                        </Link>

                        {/* Cart */}
                        <Link to='/cart' className="gap-2 mx-2">
                            <button onClick={() => handleCart(item)}
                                className="btn addBtn bg-green-800   btn-primary text-white font-bold border-0">
                                Add To Cart <FaCartShopping />
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        short_details: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        origin: PropTypes.string.isRequired,
    }).isRequired,
};

export default Card;


