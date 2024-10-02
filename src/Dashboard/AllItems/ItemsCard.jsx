import { FaRegStar, FaStar } from "react-icons/fa";
import "./ItemsCard.css";
import PropTypes from "prop-types";
import { FaArrowUpFromGroundWater, FaBangladeshiTakaSign, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import Rating from "react-rating";
import { useState } from "react";
import { Link } from "react-router-dom";
import './ItemsCard.css';

const ItemsCard = ({ item }) => {
  const { name, price, short_details, image, rating, not, long_details, _id } = item;
  const [showItems, setShowItems] = useState([]);

  const handleItemsDel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food will be deleted from the cart",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/items/${_id}`).then((res) => {
          console.log("Delete request successful:", res.data);
          const deleteItem = showItems.filter((item) => item._id !== _id);
          setShowItems(deleteItem);
          window.location.reload();
        });
      }
    });
  };

  return (
    <div>
      <div className={`card card-compact shadow-xl ${not ? "bg-slate-300 notIn" : "bg-lime-200"} border-4 border-b-lime-700`}>
        {not && <div className="notText">Out of Stock</div>}
        <figure>
          <img src={image} alt="Food" className="rounded-xl p-4 cImage" />
        </figure>
        <div className="card-body">
          <h2 className="card-title mx-auto text-2xl">
            <span className="text-red-600">Name:</span>
            {name}
          </h2>
          <p className="font-bold">
            <span className="text-red-600">Short Details: </span> {short_details}
          </p>
          <p className="font-bold">
            <span className="text-red-600">Long Details: </span>
            {long_details}
          </p>

          <div className="flex mt-2 font-semibold justify-center text-center text-red-600">
            <p className="flex items-center text-center">
              Price:
              <FaBangladeshiTakaSign /> {price}
            </p>
            <p>
              Rating:
              <Rating
                initialRating={rating} 
                emptySymbol={<FaRegStar />}
                placeholderSymbol={<FaRegStar />}
                fullSymbol={<FaStar />}
                readonly
              />
            </p>
          </div>

          {/* Delete */}
          <div className="card-actions justify-center">
            <button className="btn delIcon" onClick={handleItemsDel}>
              Delete Food <FaTrashCan />
            </button>

            <Link to={`/items/${_id}/update`}>
              <button className="btn upItem">
                Update Food
                <FaArrowUpFromGroundWater />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

ItemsCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    short_details: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    not: PropTypes.bool.isRequired,
    long_details: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemsCard;
