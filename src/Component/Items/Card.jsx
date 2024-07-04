import { FaArrowRight, FaRegStar, FaStar } from "react-icons/fa";
import "./Card.css";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaBangladeshiTakaSign, FaCartShopping } from "react-icons/fa6";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import Rating from "react-rating";

const Card = ({ item }) => {
  const { name, price, short_details, image, rating, id } = item;
  const { user } = useContext(AuthContext);
  const [addedItems, setAddedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the items already in the cart from the backend when the component mounts
    if (user && user.email) {
      axios
        .get(`http://localhost:5000/cart?email=${user.email}`)
        .then((res) => {
          const cartItems = res.data.map((cartItem) => cartItem.menuId);
          setAddedItems(cartItems);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [user]);

  const handleCart = (item) => {
    if (user && user.email) {
      if (addedItems.includes(id)) {
        Swal.fire(
          "This item already added to the cart. Please check the cart page."
        );
        return;
      }

      const cartData = {
        menuId: id,
        email: user.email,
        name,
        image,
        price,
        rating,
      };

      axios
        .post("http://localhost:5000/cart", cartData)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire("Food Added To The Cart");
            setAddedItems([...addedItems, id]);
            navigate("/cart");
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    }
  };

  return (
    <div>
      <div className="card card-compact shadow-xl bg-lime-200 border-4 border-b-lime-700">
        <figure>
          <img src={image} alt="Food" className="rounded-xl p-4 cImage" />
        </figure>
        <div className="card-body">
          <h2 className="card-title mx-auto text-2xl">{name}</h2>
          <p className="font-bold">{short_details}</p>

          <div className="flex mt-2 font-semibold justify-center text-center text-red-600">
            <p className="flex items-center text-center">
              Price:
              <FaBangladeshiTakaSign /> {price}
            </p>
            <p>
              Rating: 
              <Rating 
                initialRating={item.rating}
                emptySymbol={<FaRegStar />}
                placeholderSymbol={<FaRegStar />}
                fullSymbol={<FaStar />}
                readonly
              />
            </p>
          </div>

          {/* Details */}
          <div className="card-actions justify-center">
            <Link to={`/items/${id}`} className="flex gap-2 mx-2">
              <button className="btn bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold">
                Details <FaArrowRight />
              </button>
            </Link>

            {/* Cart */}
            <button
              onClick={() => handleCart(item)}
              className="btn addBtn bg-green-800 btn-primary text-white font-bold border-0 gap-2 mx-2"
            >
              Add To Cart <FaCartShopping />
            </button>
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
    rating: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
