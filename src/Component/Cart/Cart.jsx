import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaBangladeshiTakaSign, FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../Auth/AuthProvider";
import "./Cart.css";
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
            amount: item.amount || 0,
            price: item.price || 0,
          }));
          setShowCart(initializedData);
        });
    }
  }, [user]);

  useEffect(() => {
    handlePrice();
  });
  // }, [showCart]);

  const handlePrice = () => {
    const totalPrice = showCart.reduce((acc, item) => {
      return acc + item.amount * item.price;
    }, 0);
    setPrice(totalPrice);
  };

  const handleIncrement = (id) => {
    const updatedCart = showCart.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    setShowCart(updatedCart);
  };

  const handleDecrement = (id) => {
    const updatedCart = showCart.map((item) => {
      if (item.id === id && item.amount > 1) {
        return { ...item, amount: item.amount - 1 };
      }
      return item;
    });
    setShowCart(updatedCart);
  };

  return (
    <div>
      <Helmet>
        <title>Food Court | Cart</title>
      </Helmet>

      <div className="hero">
        <div className="overflow-x-auto mt-32 mb-12 lg:max-w-5xl w-full max-w-xl">
          <table className="table">
            <thead className="bg-red-700 text-white text-lg">
              <tr className="text-center">
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Food Price</th>
                <th>+/-</th>
                <th>Action</th>
              </tr>
            </thead>

            {showCart.map((showC) => (
              <tbody key={showC.id} className="text-center">
                <tr className="border-1 border-red-800">
                  <td>
                    <div className="avatar">
                      <div className="h-16 w-16">
                        <img
                          src={showC.image}
                          className="rounded-xl"
                          alt={showC.name}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="font-semibold text-lg">{showC.name}</div>
                  </td>

                  <td className="flex justify-center items-center gap-1 mt-5 font-semibold text-lg">
                    {showC.price}
                    <FaBangladeshiTakaSign />
                  </td>

                  <td className="btnCartx justify-center items-center">
                    <button
                      className="btnCart"
                      onClick={() => handleIncrement(showC.id)}
                    >
                      +
                    </button>
                    <span className="btnCart">{showC.amount}</span>
                    <button
                      className="btnCart"
                      onClick={() => handleDecrement(showC.id)}
                    >
                      -
                    </button>
                  </td>

                  <td>
                    <div className="flex justify-center items-center">
                      <button className="btn btn-error btn-md cartIcon">
                        <FaTrashCan></FaTrashCan>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          <div className="flex justify-center items-center gap-1 mt-5 font-semibold text-lg total">
            <span>Total Price of your food BDT : {price}</span>
            <FaBangladeshiTakaSign />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
