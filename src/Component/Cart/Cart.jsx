import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaBangladeshiTakaSign, FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../Auth/AuthProvider";
import "./Cart.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [showCart, setShowCart] = useState([]);
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState(0);

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

  return (
    <div>
      <Helmet>
        <title>Food Court | Cart</title>
      </Helmet>

      <div className="hero">
        <div className="overflow-x-auto mt-32 mb-12 lg:max-w-5xl w-full">
          <table className="table">
            <thead className="bg-red-700 text-white text-lg">
              <tr className="text-center">
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Food Price</th>
                <th className="sm:text-sm">Add/Reduce</th>
                <th>Action</th>
              </tr>
            </thead>

            {showCart.map((item) => (
              <tbody key={item._id} className="text-center">
                <tr className="border-1 border-red-800">
                  <td>
                    <div className="avatar">
                      <div className="h-16 w-16">
                        <img src={item.image} className="rounded-xl" alt={item.name}/>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold text-lg">{item.name}</div>
                  </td>
                  <td className="flex justify-center items-center gap-1 mt-5 font-semibold text-lg">
                    {item.price}
                    <FaBangladeshiTakaSign />
                  </td>
                  <td className="btnCartx justify-center items-center">
                    <button className="btnCart" onClick={() => handleIncrement(item._id)}> +
                    </button>
                    <span className="btnCart">{item.amount}</span>
                    <button className="btnCart" onClick={() => handleDecrement(item._id)}> -
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item._id)} className="btn btn-error btn-md cartIcon">  <FaTrashCan />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          <div className="flex justify-center items-center gap-1 mt-5 font-semibold text-lg total">
            <span>Total Price of your food BDT : {price}</span>
            <FaBangladeshiTakaSign />
          </div>
          <Link to={"/payment"}>
            <button  className="payCart bg-green-700 text-white p-2 rounded-lg mx-auto text-center block mt-5 px-20 text-l">
              Payment 
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
