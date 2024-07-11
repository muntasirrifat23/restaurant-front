import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaBangladeshiTakaSign, FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../Auth/AuthProvider";
import "./Cart.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [showCart, setShowCart] = useState([]);
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:5000/cart?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const initializedData = data.map((item) => ({
            ...item,
            amount: item.amount || 1,
            price: item.price || 0,
          }));
          setShowCart(initializedData);
        });
    }
  }, [user]);

  useEffect(() => {
    handlePrice();
  }, [showCart]);

  const handlePrice = () => {
    const totalPrice = showCart.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0);
    setPrice(totalPrice);
  };

  const handleIncrement = (id) => {
    const updatedCart = showCart.map((item) => {
      if (item._id === id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    setShowCart(updatedCart);
  };

  const handleDecrement = (id) => {
    const updatedCart = showCart.map((item) => {
      if (item._id === id && item.amount > 1) {
        return { ...item, amount: item.amount - 1 };
      }
      return item;
    });
    setShowCart(updatedCart);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food delete from cart",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/cart/${id}`).then((res) => {
          console.log("Delete request successful:", res.data);
          const updatedCart = showCart.filter((item) => item._id !== id);
          setShowCart(updatedCart);
        });
      }
    });
  };

  const handlePayCart = () => {
    if (price <= 0) {
      Swal.fire("Please Add Food");
    } else {
      navigate("/payment", { state: { totalPrice: price, cartItems: showCart } });
    }
  };

  return (
    <div className="text-white cartImg">
      <Helmet>
        <title>Food Court | Cart</title>
      </Helmet>
      <div className="">
        <div className="w-50 text-center justify-center mt-28">
          <p className="text-center font-bold lg:text-4xl text-3xl italic text-white mb-4">
            <p>Cart of My Food</p>
            <hr className="text-white mx-auto" style={{ width: "50%" }} />
          </p>
        </div>
        <div className="mb-12 lg:max-w-5xl w-full ">
          <table className="table">
            <thead className="bg-red-700 text-white lg:text-lg">
              <tr className="text-center">
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Food Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>

            {showCart.map((item) => (
              <tbody key={item._id} className="text-center">
                <tr className="border-1 border-white">
                  <td>
                    <div className="avatar">
                      <div className="h-16 w-16">
                        <img
                          src={item.image}
                          className="rounded-xl"
                          alt={item.name}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="font-semibold lg:text-lg">{item.name}</td>

                  <td className="flex justify-center items-center gap-1 mt-5 font-semibold text-lg ">
                    {item.price}
                    <FaBangladeshiTakaSign />
                  </td>

                  <td>
                    <div className="flex justify-center items-center">
                    <button className="btnCart" onClick={() => handleDecrement(item._id)}>
                        -
                      </button> 
                      <span className="btnQuantity">{item.amount}</span>
                      <button className="btnCart" onClick={() => handleIncrement(item._id)}>
                        +
                      </button>
                    </div>
                  </td>

                  <td className="flex justify-center items-center gap-1 mt-5 font-semibold text-lg">
                    {item.amount * item.price}
                    <FaBangladeshiTakaSign />
                  </td>

                  <td>
                    <button onClick={() => handleDelete(item._id)} className="btn btn-error btn-md delIcon"
                    >
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          <div className="flex justify-center items-center gap-1 mt-5 font-semibold text-xl total p-4 text-white">
            Total Price of Your Food BDT : <FaBangladeshiTakaSign /> {price}
            
          </div>

            {/* Button */}
          <div className="flex justify-around">
          <div>
            <Link to='/items'>
            <button className="payCart text-green-700 bg-white p-2 rounded-lg mx-auto text-center block mt-5 px-10 font-bold"> 
            Add More Order
            </button></Link>
          </div>

          <div>
          <button onClick={handlePayCart} className="payCart bg-green-700 text-white p-2 rounded-lg mx-auto text-center block mt-5 px-20 text-l">
            Payment
          </button>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
